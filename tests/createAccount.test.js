import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import SignUp from "../pages/signup.js";
import { useSession } from 'next-auth/react'
import "@testing-library/jest-dom";
jest.mock("next-auth/react");

describe("createAccount", () => {
  it("Works", async () => {
    const mockSession = {
      expires: "1",
      user: { user: "test1", userCategory: "user"},
    };

    (useSession).mockReturnValueOnce([mockSession, false]);

    render(<SignUp />);
  });
});