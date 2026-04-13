import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  IconButton,
  Heading,
  Text,
  Flex,
} from '@chakra-ui/react';
import { FiTrash2 } from 'react-icons/fi';

const TransactionList = ({ transactions, onDeleteTransaction }) => {
  if (transactions.length === 0) {
    return (
      <Box p={10} textAlign="center" bg="whiteAlpha.100" borderRadius="xl">
        <Text color="gray.500">No transactions recorded yet.</Text>
      </Box>
    );
  }

  return (
    <Box overflowX="auto" bg="whiteAlpha.100" borderRadius="xl" borderWidth="1px" borderColor="whiteAlpha.200">
      <Table variant="simple">
        <Thead bg="whiteAlpha.50">
          <Tr>
            <Th color="gray.400">Description</Th>
            <Th color="gray.400">Category</Th>
            <Th color="gray.400">Type</Th>
            <Th color="gray.400" isNumeric>Amount</Th>
            <Th color="gray.400" textAlign="center">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {transactions.map((transaction) => (
            <Tr key={transaction.id} _hover={{ bg: 'whiteAlpha.50' }}>
              <Td fontWeight="medium">{transaction.description}</Td>
              <Td>
                <Badge colorScheme="gray" borderRadius="full" px={2}>
                  {transaction.category}
                </Badge>
              </Td>
              <Td>
                <Badge
                  colorScheme={transaction.type === 'income' ? 'brand' : 'red'}
                  variant="subtle"
                  borderRadius="full"
                  px={3}
                  textTransform="capitalize"
                >
                  {transaction.type}
                </Badge>
              </Td>
              <Td isNumeric fontWeight="bold" color={transaction.type === 'income' ? 'brand.400' : 'red.400'}>
                {transaction.type === 'income' ? '+' : '-'}${parseFloat(transaction.amount).toLocaleString()}
              </Td>
              <Td textAlign="center">
                <IconButton
                  aria-label="Delete transaction"
                  icon={<FiTrash2 />}
                  variant="ghost"
                  colorScheme="red"
                  size="sm"
                  onClick={() => onDeleteTransaction(transaction.id)}
                  _hover={{ bg: 'red.500', color: 'white' }}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default TransactionList;
