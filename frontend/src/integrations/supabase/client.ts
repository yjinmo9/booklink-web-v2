// Supabase 클라이언트 - MySQL 백엔드로 전환으로 인해 비활성화됨
// 이제 백엔드 API를 직접 사용합니다 (src/lib/api.ts 참고)

// 더 이상 Supabase를 사용하지 않으므로 이 파일은 더미 객체를 export합니다
// 기존 코드와의 호환성을 위해 임시로 유지하되, 실제 사용은 백엔드 API로 전환해야 합니다

export const supabase = {
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    signUp: async () => ({ error: new Error('Supabase는 더 이상 사용하지 않습니다. 백엔드 API를 사용하세요.') }),
    signInWithPassword: async () => ({ error: new Error('Supabase는 더 이상 사용하지 않습니다. 백엔드 API를 사용하세요.') }),
    signInWithOAuth: async () => ({ error: new Error('Supabase는 더 이상 사용하지 않습니다. 백엔드 API를 사용하세요.') }),
    signOut: async () => ({ error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
  },
  from: () => ({
    select: () => ({ data: [], error: null }),
    insert: () => ({ data: [], error: null }),
    update: () => ({ data: [], error: null }),
    delete: () => ({ data: [], error: null }),
  }),
  functions: {
    invoke: async () => ({ data: null, error: new Error('Supabase는 더 이상 사용하지 않습니다. 백엔드 API를 사용하세요.') }),
  },
} as any;