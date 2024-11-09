import React from "react";

import { Calendar } from "./calendar";

import "./styles/variables.css";
import "./styles/app.css";

export const App: React.FC = () => {
  return (
    <div className="app">
      <Calendar />
    </div>
  );
};
