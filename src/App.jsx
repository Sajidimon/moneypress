import {
  Box,
  Container,
  SimpleGrid,
  Heading,
  Text,
  Flex,
  useToast,
  VStack,
  HStack,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiArrowUpCircle, FiArrowDownCircle, FiDollarSign } from 'react-icons/fi';
import StatsCard from './components/StatsCard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';

// Backend API Base URL
const API_BASE_URL = 'http://localhost:8000/api';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/transactions`);
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      toast({
        title: 'Network Error',
        description: 'Could not connect to the backend API. Make sure Laravel is running.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddTransaction = async (newTransaction) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/transactions`, newTransaction);
      setTransactions([response.data, ...transactions]);
    } catch (error) {
      console.error('Error adding transaction:', error);
      throw error;
    }
  };

  const handleDeleteTransaction = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/transactions/${id}`);
      setTransactions(transactions.filter((t) => t.id !== id));
      toast({
        title: 'Deleted',
        status: 'info',
        duration: 2000,
      });
    } catch (error) {
      console.error('Error deleting transaction:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete transaction',
        status: 'error',
      });
    }
  };

  // Calculations
  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + parseFloat(t.amount), 0);
  const expenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + parseFloat(t.amount), 0);
  const balance = income - expenses;

  return (
    <Box minH="100vh" pb={10}>
      <Container maxW="container.xl" pt={10}>
        <Flex direction="column" mb={10}>
          <Heading size="2xl" mb={2} bgGradient="linear(to-r, brand.400, brand.600)" bgClip="text">
            MoneyPress
          </Heading>
          <Text color="gray.400" fontSize="lg">
            Intelligent Income & Expense Manager
          </Text>
        </Flex>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} mb={10}>
          <StatsCard
            title="Total Balance"
            amount={balance}
            icon={FiDollarSign}
            color="brand"
            helpText={balance >= 0 ? "Healthy status" : "Budget deficit!"}
          />
          <StatsCard
            title="Total Income"
            amount={income}
            icon={FiArrowUpCircle}
            color="brand"
          />
          <StatsCard
            title="Total Expenses"
            amount={expenses}
            icon={FiArrowDownCircle}
            color="red"
          />
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={8}>
          <Box gridColumn={{ lg: 'span 1' }}>
            <TransactionForm onAddTransaction={handleAddTransaction} />
          </Box>
          <Box gridColumn={{ lg: 'span 2' }}>
            <VStack align="stretch" spacing={6}>
              <Heading size="md" color="gray.300">Recent Transactions</Heading>
              <TransactionList
                transactions={transactions}
                onDeleteTransaction={handleDeleteTransaction}
              />
            </VStack>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
}

export default App;
