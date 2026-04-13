import { Box, Stat, StatLabel, StatNumber, StatHelpText, Icon, Flex } from '@chakra-ui/react';

const StatsCard = ({ title, amount, helpText, icon, color }) => {
  return (
    <Box
      p={5}
      shadow="xl"
      borderWidth="1px"
      borderRadius="xl"
      bg="whiteAlpha.100"
      _hover={{ transform: 'translateY(-5px)', transition: '0.3s' }}
      borderColor="whiteAlpha.200"
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Stat>
          <StatLabel color="gray.400" fontSize="sm" fontWeight="medium">
            {title}
          </StatLabel>
          <StatNumber fontSize="2xl" fontWeight="bold">
            ${amount.toLocaleString()}
          </StatNumber>
          {helpText && (
            <StatHelpText color={color} fontWeight="bold">
              {helpText}
            </StatHelpText>
          )}
        </Stat>
        <Box
          p={3}
          bg={`${color}.500`}
          borderRadius="lg"
          boxShadow={`0 4px 20px -5px ${color}`}
        >
          <Icon as={icon} w={6} h={6} color="white" />
        </Box>
      </Flex>
    </Box>
  );
};

export default StatsCard;
