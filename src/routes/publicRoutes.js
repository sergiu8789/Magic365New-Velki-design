import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../components/Pages/Home/Home";
import { Login } from "../components/Pages/Login/Login";
import { Sports } from "../components/Pages/Sports/Sports";
import { InPlayGames } from "../components/Pages/InPlayGames/InPlayGames";
import { CurrentBets } from "../components/Pages/CurrentBets/CurrentBets";
import { BalanceOverview } from "../components/Pages/BalanceOverview/BalanceOverview";
import { WhatsAppNumber } from "../components/Pages/WhatsAppNumber/WhatsAppNumber";
import { ActivityLog } from "../components/Pages/ActivityLog/ActivityLog";
import { BetHistory } from "../components/Pages/BetHistory/BetHistory";
import { ProfitLoss } from "../components/Pages/ProfitLoss/ProfitLoss";
import { Settings } from "../components/Pages/Settings/Settings";
import { MyAccount } from "../components/Pages/MyAccount/MyAccount";
import { ChangePassword } from "../components/Pages/ChangePassword/ChangePassword";
import { Leagues } from "../components/Pages/Leagues/Leagues";

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Sports" element={<Sports />} />
      <Route path="/full-market" element={<InPlayGames />} />
      <Route path="/menu/current-bets" element={<CurrentBets />} />
      <Route path="/menu/balance-overview" element={<BalanceOverview />} />
      <Route path="/menu/upline-whatsapp-number" element={<WhatsAppNumber />} />
      <Route path="/menu/active-log" element={<ActivityLog />} />
      <Route path="/menu/bets-history" element={<BetHistory />} />
      <Route path="/menu/profit-and-loss" element={<ProfitLoss />} />
      <Route path="/menu/my-profile" element={<MyAccount />} />
      <Route path="/menu/setting" element={<Settings />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/leagues" element={<Leagues />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
};
