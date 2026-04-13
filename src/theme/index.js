import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  colors: {
    brand: {
      50: '#eefcf1',
      100: '#d0f8d9',
      200: '#a3efb3',
      300: '#6de283',
      400: '#38ce54',
      500: '#16b231',
      600: '#0e8f24',
      700: '#0d711f',
      800: '#0f591d',
      900: '#0e4a1b',
    },
    expense: {
      500: '#FF4D4D',
    },
    income: {
      500: '#00D68F',
    }
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? '#0f172a' : '#f8fafc',
        color: props.colorMode === 'dark' ? '#f1f5f9' : '#1e293b',
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 'lg',
        fontWeight: 'bold',
      },
      variants: {
        solid: (props) => ({
          bg: props.colorScheme === 'brand' ? 'brand.500' : undefined,
          _hover: {
            bg: props.colorScheme === 'brand' ? 'brand.600' : undefined,
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          },
          transition: 'all 0.2s',
        }),
      },
    },
    Card: {
      baseStyle: (props) => ({
        container: {
          borderRadius: 'xl',
          boxShadow: 'xl',
          bg: props.colorMode === 'dark' ? 'whiteAlpha.100' : 'white',
          backdropFilter: 'blur(10px)',
          borderWidth: '1px',
          borderColor: props.colorMode === 'dark' ? 'whiteAlpha.200' : 'blackAlpha.100',
          overflow: 'hidden',
          transition: 'all 0.3s',
          _hover: {
            transform: 'translateY(-4px)',
            boxShadow: '2xl',
            borderColor: 'brand.500',
          },
        },
      }),
    },
  },
});

export default theme;
