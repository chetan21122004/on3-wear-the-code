// Order service hooks - temporarily disabled until orderService is implemented
// Uncomment when orderService.ts is created

/*
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { orderService, CreateOrderData } from '@/services/orderService'
import { useAuth } from '@/contexts/AuthContext'

// Query keys
export const orderKeys = {
  all: ['orders'] as const,
  lists: () => [...orderKeys.all, 'list'] as const,
  list: (userId: string) => [...orderKeys.lists(), userId] as const,
  details: () => [...orderKeys.all, 'detail'] as const,
  detail: (id: string) => [...orderKeys.details(), id] as const,
  stats: () => [...orderKeys.all, 'stats'] as const,
  admin: () => [...orderKeys.all, 'admin'] as const,
}

// Get user's orders
export const useUserOrders = (limit?: number) => {
  const { user } = useAuth()

  return useQuery({
    queryKey: orderKeys.list(user?.id || ''),
    queryFn: () => orderService.getUserOrders(user!.id, limit),
    enabled: !!user,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Get order by ID
export const useOrder = (orderId: string) => {
  const { user } = useAuth()

  return useQuery({
    queryKey: orderKeys.detail(orderId),
    queryFn: () => orderService.getOrderById(orderId, user?.id),
    enabled: !!orderId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

// Get order statistics (admin)
export const useOrderStats = () => {
  return useQuery({
    queryKey: orderKeys.stats(),
    queryFn: () => orderService.getOrderStats(),
    staleTime: 30 * 60 * 1000, // 30 minutes
  })
}

// Get all orders (admin)
export const useAllOrders = (status?: string, limit?: number, offset?: number) => {
  return useQuery({
    queryKey: [...orderKeys.admin(), { status, limit, offset }],
    queryFn: () => orderService.getAllOrders(status, limit, offset),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Create order mutation
export const useCreateOrder = () => {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (orderData: CreateOrderData) => {
      if (!user) throw new Error('User not authenticated')
      return orderService.createOrder(user.id, orderData)
    },
    onSuccess: () => {
      if (user) {
        queryClient.invalidateQueries({ queryKey: orderKeys.list(user.id) })
        queryClient.invalidateQueries({ queryKey: orderKeys.stats() })
        // Also clear cart after successful order
        queryClient.invalidateQueries({ queryKey: ['cart'] })
      }
    },
  })
}

// Update order status mutation
export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ 
      orderId, 
      status, 
      razorpayPaymentId 
    }: { 
      orderId: string
      status: string
      razorpayPaymentId?: string 
    }) => orderService.updateOrderStatus(orderId, status, razorpayPaymentId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: orderKeys.detail(data.id) })
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() })
      queryClient.invalidateQueries({ queryKey: orderKeys.admin() })
      queryClient.invalidateQueries({ queryKey: orderKeys.stats() })
    },
  })
}

// Cancel order mutation
export const useCancelOrder = () => {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (orderId: string) => {
      if (!user) throw new Error('User not authenticated')
      return orderService.cancelOrder(orderId, user.id)
    },
    onSuccess: (data) => {
      if (user) {
        queryClient.invalidateQueries({ queryKey: orderKeys.detail(data.id) })
        queryClient.invalidateQueries({ queryKey: orderKeys.list(user.id) })
        queryClient.invalidateQueries({ queryKey: orderKeys.stats() })
      }
    },
  })
}
*/

export {}
