import type { Participant as ParticipantModel } from '@dolbyio/comms-sdk-react-native/lib/typescript/services/conference/models';
import React, { useMemo, useState, useEffect } from 'react';
import { View } from 'react-native';

import useParticipants from '../../../hooks/useParticipants';
import MoreParticipants from '../MoreParticipants/MoreParticipants';
import Participant from '../Participant/Participant';

import styles from './ParticipantsGrid.style';

const ParticipantsGrid = () => {
  const { participants, user, participantsIsSpeaking, participantsIsVideoEnabled } = useParticipants();
  const MAX_TILES = 6;
  const maxRemoteParticipantTiles = useMemo(() => {
    if (participants.length > MAX_TILES) {
      return MAX_TILES - 2; // To accomodate the `MoreParticipants` tile
    }
    return MAX_TILES - 1;
  }, [participants]);

  const [activeHistory, setActiveHistory] = useState<Record<string, number>>({});
  const [activeParticipants, setActiveParticipants] = useState<string[]>([]);
  const [cachedParticipantsIsVideoEnabled, setCachedParticipantsIsVideoEnabled] = useState<Record<string, boolean>>({});

  useEffect(() => {
    participants.forEach((participant) => {
      const participantID = participant.id;
      const isSpeaking = participantsIsSpeaking[participantID];
      const isVideo = participantsIsVideoEnabled[participantID];

      if (user?.id !== participantID) {
        if (isSpeaking || (isVideo && cachedParticipantsIsVideoEnabled[participantID] === false)) {
          setActiveHistory((prev) => ({
            ...prev,
            [participantID]: Date.now(),
          }));
          if (activeParticipants.indexOf(participantID) === -1) {
            if (activeParticipants.length < maxRemoteParticipantTiles) {
              setActiveParticipants((prev) => [...prev, participantID]);
            } else {
              // Find the least active speaker
              let index = 0;
              let lowest = 0;
              activeParticipants.forEach((id, i) => {
                const time = activeHistory[id];
                if (time) {
                  if (i === 0) {
                    lowest = time;
                  } else if (time < lowest) {
                    index = i;
                    lowest = time;
                  }
                }
              });
              // Replace the least active speaker with new one
              setActiveParticipants((prev) => {
                const copy = [...prev];
                copy.splice(index, 1, participantID);
                return copy;
              });
            }
          }
        }
      }
    });
    setCachedParticipantsIsVideoEnabled(participantsIsVideoEnabled);
  }, [participants, user, participantsIsSpeaking, participantsIsVideoEnabled]);

  /**
   * Participants Grid always show the local user as the last tile on the grid
   * Other remote participants are sorted based on their activity (either isSpeaking or `video enabled` state)
   */
  const [participantsToDisplay, remainingParticipants] = useMemo(() => {
    const remoteParticipants = participants.filter((participant) => participant.id !== user?.id);
    const localParticipant = participants.find((participant) => participant.id === user?.id);

    if (remoteParticipants.length > maxRemoteParticipantTiles) {
      const order: Record<string, number> = {};

      activeParticipants.forEach((id, index) => {
        order[id] = index;
      });

      remoteParticipants.sort((a, b) => {
        const orderA = order[a.id];
        const orderB = order[b.id];
        if (orderA === undefined && orderB === undefined) {
          return 0;
        }
        if (orderA === undefined) {
          return 1;
        }
        if (orderB === undefined) {
          return -1;
        }
        return orderA - orderB;
      });
    }
    let participantsToDisplay: ParticipantModel[] = remoteParticipants.slice(0, maxRemoteParticipantTiles);
    let remainingParticipants: ParticipantModel[] = remoteParticipants.slice(maxRemoteParticipantTiles);
    if (localParticipant) {
      if (participantsToDisplay.length === 0) {
        participantsToDisplay = [localParticipant];
        remainingParticipants = [];
      } else {
        participantsToDisplay.push(localParticipant);
      }
    }
    return [participantsToDisplay, remainingParticipants];
  }, [participants, user, participantsIsSpeaking, participantsIsVideoEnabled, activeParticipants]);

  // `presetMatrices` defines the layout applied for participant tiles
  // Key --> `Total number of Participant Tiles`
  // Value --> `Presetted layout matrix`
  // For example - a value of [1, 2] represents `Two rows of participant tiles` with:
  // `One tile in row 0`
  // `Two tiles in row 1`
  const presetMatrices: { [totalNumberOfTiles: number]: number[] } = {
    1: [1],
    2: [1, 1],
    3: [1, 2],
    4: [2, 2],
    5: [2, 2, 1],
    6: [2, 2, 2],
  };

  interface ParticipantTile {
    participant: ParticipantModel;
  }

  interface MoreParticipantsTile {
    participants: ParticipantModel[];
  }

  type Tile = ParticipantTile | MoreParticipantsTile;

  const matricedParticipantTiles = useMemo(() => {
    const matricedParticipantTiles: Tile[][] = [];
    if (participantsToDisplay.length > 0) {
      let participantList = [...participantsToDisplay];
      const totalTiles = participantList.length + (remainingParticipants.length > 0 ? 1 : 0);
      const expectedLayoutMatrix = presetMatrices[totalTiles];

      expectedLayoutMatrix.forEach((presetNumberOfColumns, currentRow) => {
        let currentColumn = 0;
        const tilesForRow: Tile[] = [];
        while (currentColumn < presetNumberOfColumns) {
          const [first] = participantList;
          if (first) {
            tilesForRow[currentColumn] = { participant: first };
            participantList = participantList.slice(1, participantList.length);
          } else if (
            currentRow === expectedLayoutMatrix.length - 1 &&
            currentColumn === presetNumberOfColumns - 1 &&
            remainingParticipants.length > 0
          ) {
            tilesForRow[currentColumn] = { participants: remainingParticipants };
          }
          currentColumn += 1;
        }
        matricedParticipantTiles[currentRow] = tilesForRow;
      });
    }
    return matricedParticipantTiles;
  }, [participants, user, activeParticipants]);

  const keyForParticipantList = (tiles: Tile[]) => {
    return tiles.reduce((value, tile) => value + keyForTile(tile), '');
  };

  const keyForTile = (tile: Tile) => {
    const { participant } = tile as ParticipantTile;
    const { participants } = tile as MoreParticipantsTile;
    if (participant !== undefined) {
      return participant.id;
    }

    if (participants !== undefined && participants.length > 0) {
      const [first] = participants;
      return first.id;
    }

    return '';
  };

  return (
    <View testID="ParticipantsGrid" style={styles.wrapper}>
      {matricedParticipantTiles.map((tilesForRow, rowIndex) => {
        return (
          <View key={`GridRow-${keyForParticipantList(tilesForRow)}`} style={styles.gridRowWrapper}>
            <View style={[styles.participantsRowWrapper]}>
              {tilesForRow.map((tile, columnIndex) => {
                return (
                  <View key={`GridItem-${keyForTile(tile)}`} style={styles.gridItemWrapper}>
                    {(tile as MoreParticipantsTile).participants !== undefined && (
                      <MoreParticipants participants={(tile as MoreParticipantsTile).participants} />
                    )}
                    {(tile as ParticipantTile).participant !== undefined && (
                      <Participant participant={(tile as ParticipantTile).participant} />
                    )}
                    {columnIndex !== tilesForRow.length - 1 && <View style={styles.spacer} />}
                  </View>
                );
              })}
            </View>
            {rowIndex !== matricedParticipantTiles.length - 1 && <View style={styles.spacer} />}
          </View>
        );
      })}
    </View>
  );
};

export default ParticipantsGrid;
