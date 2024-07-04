'use client';

import { useRouter } from "next/navigation";

export default function useRoutingServices() {
  const router = useRouter();

  const navigateToDashboard = function() {
    router.push("/dashboard");
  };

  const navigateToUserSettings = function() {
    router.push("/usersettings");
  };

  const navigateToTransactions = function() {
    router.push("/transactions");
  };
  
  return {
    navigateToDashboard,
    navigateToUserSettings,
    navigateToTransactions,
  };
}