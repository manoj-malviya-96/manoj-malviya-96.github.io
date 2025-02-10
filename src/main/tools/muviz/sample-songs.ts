import Princess from "./sample-music/princess.mp3";
import Finally from "./sample-music/finally.mp3";
import StayInit from "./sample-music/FredAgain_StayInit.mp3";
import LeaveTheWorldBehind from "./sample-music/LeaveTheWorldBehing.mp3";
import { AtomDropdownItemProps } from "../../../atoms/atom-dropdown";

export const defaultSongOptions = [
  {
    label: "Princess",
    value: Princess,
  } as AtomDropdownItemProps,
  {
    label: "Finally",
    value: Finally,
  } as AtomDropdownItemProps,
  {
    label: "STAYinit",
    value: StayInit,
  } as AtomDropdownItemProps,
  {
    label: "LeaveTheWorld",
    value: LeaveTheWorldBehind,
  } as AtomDropdownItemProps,
];
