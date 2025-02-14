export const appRoutes = {
  home: {
    url: () => "/",
    login: {
      url: () => "/auth/login",
    },
    investments: {
      url: () => "/investments",
    },
    wallet: {
      url: () => "/wallet",
    },
    currencies: {
      url: () => "/currency",
    },
    config: {
      url: () => "/config",
      users: {
        url: () => "/config/users",
      },
    },
    profile: {
      url: () => "/profile",
    },
    privacyPolicy: {
      url: () => "/privacy",
    },
  },
};
