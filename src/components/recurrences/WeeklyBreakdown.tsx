import {
  Box,
  Icon,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { FiActivity, FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import { useSelector } from "react-redux";
import { recurrencesSelectors } from "../../slices/recurrencesSlice";
import { getWeeklyIncome, getWeeklyExpenses } from "../../utils/tracking";
import { getSafeToSpend } from "./../../utils/tracking";

export const WeeklyBreakdown = () => {
  const recurrences = useSelector(recurrencesSelectors.list);
  const weeklyIncome = getWeeklyIncome(recurrences);
  const weeklyExpenses = getWeeklyExpenses(recurrences);
  const safeToSpend = getSafeToSpend(recurrences);
  const bgColor = useColorModeValue("gray.100", "gray.700");

  return (
    <Stack justifyContent="center" direction={["column", "row"]} spacing={5}>
      <Box borderRadius="lg" bg={bgColor}>
        <Stat m="5px" textAlign="center">
          <StatLabel>Weekly Income</StatLabel>
          <StatNumber>
            <Icon m="5px" color="green.400" as={FiTrendingUp} />$
            {weeklyIncome.toFixed(2)}
          </StatNumber>
        </Stat>
      </Box>
      <Box borderRadius="lg" bg={bgColor}>
        <Stat m="5px" textAlign="center">
          <StatLabel>Weekly Expenses</StatLabel>
          <StatNumber>
            <Icon m="5px" color="red.400" as={FiTrendingDown} />$
            {weeklyExpenses.toFixed(2)}
          </StatNumber>
        </Stat>
      </Box>
      <Box borderRadius="lg" bg={bgColor}>
        <Stat m="5px" textAlign="center">
          <StatLabel>Weekly Safe-To-Spend</StatLabel>
          <StatNumber>
            <Icon m="5px" color="cyan.400" as={FiActivity} />$
            {safeToSpend.toFixed(2)}
          </StatNumber>
        </Stat>
      </Box>
    </Stack>
  );
};
