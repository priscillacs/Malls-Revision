// import { useContext } from "react";
// import React, { useState } from "react";
// import styled from "styled-components/native";
// import { Fontisto } from "@expo/vector-icons";
// import { TouchableOpacity } from "react-native";

// // import { SavedContext } from "../services/storecart/saved.context";

// const SavedButton = styled(TouchableOpacity)`
//   position: absolute;
//   top: 30px;
//   right: 30px;
//   z-index: 9;
// `;

// export const Saved = ({ savedDetails }) => {
//   const { saved, addToSaved, removeFromSaved } = useContext(SavedContext);
//   console.log(saved.length);
//   const isSaved = saved.find((s) => s.placeId === savedDetails.placeId);
//   return (
//     <SavedButton
//       onPress={() =>
//         !isSaved ? addToSaved(savedDetails) : removeFromSaved(savedDetails)
//       }
//     >
//       <Fontisto
//         name={isSaved ? "bookmark-alt" : "bookmark"}
//         size={30}
//         color={isSaved ? "red" : "white"}
//       />
//     </SavedButton>
//   );
// };
