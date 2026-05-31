export enum ChatSendingState {
  Idle,
  Preparing,
  ResizingImages,
  Prepared,
  CreatingWsConnection,
  Sending,
}