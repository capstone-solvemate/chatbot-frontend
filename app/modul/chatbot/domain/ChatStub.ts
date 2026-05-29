import { Chat } from "./Chat";

export function mockChats(): Chat[] {
  return [
    new Chat(
      1n,
      1,
      new Date("2024-05-20 05:00:00"),
      "Mock Chat 1",
      false,
      false
    ),
    new Chat(
      2n,
      1,
      new Date("2024-05-20 05:00:00"),
      "Mock Chat 2",
      false,
      false
    ),
    new Chat(
      3n,
      1,
      new Date("2024-05-20 05:00:00"),
      "Mock Chat 3",
      false,
      false
    ),
  ]
}