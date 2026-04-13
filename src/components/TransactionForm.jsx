import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  Heading,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';

const TransactionForm = ({ onAddTransaction }) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'expense',
    category: 'General',
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount) {
      toast({
        title: 'Error',
        description: 'Please fill all fields',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    setLoading(true);
    try {
      await onAddTransaction(formData);
      setFormData({ description: '', amount: '', type: 'expense', category: 'General' });
      toast({
        title: 'Success',
        description: 'Transaction added successfully',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add transaction',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={6} bg="whiteAlpha.100" borderRadius="xl" borderWidth="1px" borderColor="whiteAlpha.200">
      <Heading size="md" mb={6} color="brand.400">Add New Transaction</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel color="gray.400">Description</FormLabel>
            <Input
              placeholder="Rent, Salary, Groceries..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              bg="whiteAlpha.50"
              border="none"
              focusBorderColor="brand.500"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel color="gray.400">Amount ($)</FormLabel>
            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              bg="whiteAlpha.50"
              border="none"
              focusBorderColor="brand.500"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel color="gray.400">Type</FormLabel>
            <Select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              bg="whiteAlpha.50"
              border="none"
              focusBorderColor="brand.500"
            >
              <option style={{backgroundColor: '#1E293B'}} value="income">Income</option>
              <option style={{backgroundColor: '#1E293B'}} value="expense">Expense</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel color="gray.400">Category</FormLabel>
            <Select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              bg="whiteAlpha.50"
              border="none"
              focusBorderColor="brand.500"
            >
              <option style={{backgroundColor: '#1E293B'}} value="General">General</option>
              <option style={{backgroundColor: '#1E293B'}} value="Food">Food</option>
              <option style={{backgroundColor: '#1E293B'}} value="Housing">Housing</option>
              <option style={{backgroundColor: '#1E293B'}} value="Transport">Transport</option>
              <option style={{backgroundColor: '#1E293B'}} value="Salary">Salary</option>
              <option style={{backgroundColor: '#1E293B'}} value="Entertainment">Entertainment</option>
            </Select>
          </FormControl>

          <Button
            colorScheme="brand"
            width="full"
            type="submit"
            isLoading={loading}
            mt={2}
          >
            Add Transaction
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default TransactionForm;
