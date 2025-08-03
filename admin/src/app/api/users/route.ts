import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function DELETE(request: NextRequest) {
  try {
    const { email } = await request.json();

    console.log(email);
    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // 1. Find user by email
    const searchRes = await axios.get("https://api.clerk.com/v1/users", {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
      params: {
        emailAddress: email,
        limit: 1,
      },
    });

    const users = searchRes.data;

    if (!users.length) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const userId = users[0].id;

    // 2. Delete user by ID
    await axios.delete(`https://api.clerk.com/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
    });

    return NextResponse.json({ message: "User deleted successfully", userId });
  } catch (error: any) {
    console.error(
      "Error deleting user:",
      error.response?.data || error.message
    );
    return NextResponse.json(
      {
        message: "Failed to delete user",
        error: error.response?.data || error.message,
      },
      { status: 500 }
    );
  }
}
