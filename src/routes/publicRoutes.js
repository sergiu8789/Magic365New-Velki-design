import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../components/Pages/Home/Home";
import { Login } from "../components/Pages/Login/Login";
import { SignUp } from "../components/Pages/SignUp/SignUp";
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
import { ProtectedRoutes } from "../components/auth/ProtectedRoutes";

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Sports" element={<Sports />} />
      <Route path="/full-market" element={<InPlayGames />} />
      <Route
        path="/current-bets"
        element={<ProtectedRoutes element={<CurrentBets />} />}
      />
      <Route
        path="/balance-overview"
        element={<ProtectedRoutes element={<BalanceOverview />} />}
      />
      <Route
        path="/upline-whatsapp-number"
        element={<ProtectedRoutes element={<WhatsAppNumber />} />}
      />
      <Route
        path="/active-log"
        element={<ProtectedRoutes element={<ActivityLog />} />}
      />
      <Route
        path="/bets-history"
        element={<ProtectedRoutes element={<BetHistory />} />}
      />
      <Route
        path="/profit-and-loss"
        element={<ProtectedRoutes element={<ProfitLoss />} />}
      />
      <Route
        path="/my-profile"
        element={<ProtectedRoutes element={<MyAccount />} />}
      />
      <Route
        path="/setting"
        element={<ProtectedRoutes element={<Settings />} />}
      />
      <Route
        path="/change-password"
        element={<ProtectedRoutes element={<ChangePassword />} />}
      />
      <Route path="/leagues" element={<Leagues />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
};
