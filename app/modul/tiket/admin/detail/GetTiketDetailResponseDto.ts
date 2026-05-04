export interface PesanChatDto {
  id: number
  sender: 'user' | 'bot' | 'admin'
  message: string
  sentAt: string
}

export interface GetTiketDetailResponseDto {
  id: number
  ticketNumber: string
  status: string
  userName: string
  userEmail: string
  category: string
  createdAt: string
  chatbotConversation: PesanChatDto[]
  supportConversation: PesanChatDto[]
}