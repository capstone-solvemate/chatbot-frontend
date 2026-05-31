export function mockMessageEvent(overrides: {
  data?: any
} = {}): MessageEvent {
  return {
    data: overrides.data ?? '{}'
  } as unknown as MessageEvent
}