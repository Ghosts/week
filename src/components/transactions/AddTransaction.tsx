import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  NumberInput,
  NumberInputField,
  Select,
  Stack,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { getTypedTransactionType, transactionTypes } from "../../models/common";
import { addTransaction } from "../../slices/transactionsSlice";
import { toTitleCase } from "../../utils/string";

export const AddTransaction = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [description, setDescription] = useState("Starbucks");
  const [amount, setAmount] = useState(1.53);
  const [type, setType] = useState("expense");
  const [date, setDate] = useState("");
  const toast = useToast();

  const dispatch = useDispatch();

  const newTransaction = () => {
    dispatch(
      addTransaction({
        type: getTypedTransactionType(type),
        amount: amount,
        description: description,
        date: date,
      })
    );
    toast({
      title: "Transaction added",
      description: `Your Safe-To-Spend will update shortly.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    onClose();
  };
  return (
    <>
      <Tooltip label="Add manual transaction">
        <IconButton
          variant="ghost"
          colorScheme="cyan"
          onClick={onOpen}
          aria-label="Add manual transaction"
          icon={<Icon boxSize="1.5em" as={FiPlusCircle} color="cyan.400" />}
        />
      </Tooltip>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Add Transaction</DrawerHeader>
            <DrawerBody>
              <form>
                <Stack spacing={3}>
                  <InputGroup>
                    <InputLeftAddon children="Description" />
                    <FormControl isRequired>
                      <Input
                        onChange={(event) => setDescription(event.target.value)}
                        variant="outline"
                        placeholder="Starbucks"
                      />
                    </FormControl>
                  </InputGroup>
                  <InputGroup>
                    <InputLeftAddon children="Type" />
                    <Select
                      onChange={(event) => setType(event.target.value)}
                      variant="outline"
                    >
                      <option disabled selected>
                        Select Type
                      </option>
                      {transactionTypes.map((transactionType, idx) => {
                        return (
                          <option key={idx} value={transactionType}>
                            {toTitleCase(transactionType)}
                          </option>
                        );
                      })}
                    </Select>
                  </InputGroup>
                  <InputGroup>
                    <InputLeftAddon children="Date" />
                    <Input
                      onChange={(event) => setDate(event.target.value)}
                      type="date"
                      variant="outline"
                      placeholder="Today!"
                    />
                  </InputGroup>
                  <InputGroup>
                    <InputLeftAddon children="Amount" />
                    <NumberInput
                      variant="outline"
                      onChange={(v, n) => setAmount(n)}
                      precision={2}
                    >
                      <NumberInputField />
                    </NumberInput>
                  </InputGroup>
                </Stack>
              </form>
            </DrawerBody>
            <DrawerFooter>
              <Stack direction="row" spacing={4}>
                <Button onClick={onClose}>Close</Button>
                <Button
                  type="submit"
                  colorScheme="green"
                  onClick={newTransaction}
                >
                  Add
                </Button>
              </Stack>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};
