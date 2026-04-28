import { paramCase } from 'src/utils/change-case';

const ROOTS = {
  AUTH: '/auth',
};

// ----------------------------------------------------------------------

export const paths = {
  home: '/home',
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/error/403',
  page404: '/error/404',
  page500: '/error/500',
  components: '/components',
  product: {
    root: `/product`,
    checkout: `/product/checkout`,
    details: (id) => `/product/${id}`,
  },
  post: {
    root: `/post`,
    details: (title) => `/post/${paramCase(title)}`,
  },
  // AUTH
  auth: {
    jwt: {
      signIn: `${ROOTS.AUTH}/jwt/sign-in`,
      signUp: `${ROOTS.AUTH}/jwt/sign-up`,
    },
    roleSelection: `${ROOTS.AUTH}/role-selection`,
    signIn: (role) => `${ROOTS.AUTH}/sign-in/${role}`,
  },
};
