import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import React from "react";

import emojiList from "./emojiList.json";
import EmojiResults from "./EmojiResults";
import App from "./App";

it("başlık testi", () => {
  render(<App />);
  const txt = screen.getByText(/Emoji Search/i);
});

it("emoji listesi testi", () => {
  render(<App />);

  render(<EmojiResults emojiData={emojiList} />);

  const isListed = screen.getAllByText("Click to copy emoji");
  isListed.forEach((i) => expect(i).toBeInTheDocument());
});

it("emoji filtre testi", () => {
  render(<App />);
  render(<EmojiResults emojiData={emojiList} />);

  let keyword = "emotion";

  const input = screen.getByAltText("emojiInput");
  userEvent.type(input, keyword);

  const filteredEmojiList = screen.getAllByText(/emotion/i);
  expect(
    filteredEmojiList.every((f) =>
      f.textContent.toLowerCase().includes(keyword)
    )
  ).toEqual(true);
});

it("emoji kopyalama testi", async () => {
  render(<App />);
  render(<EmojiResults emojiData={emojiList} />);

  let testEmoji = {
    title: "Grinning",
    symbol: "😀",
  };

  const emojiInput = screen.getByAltText("emojiInput");

  const emo = screen.getAllByAltText(testEmoji.title);
  userEvent.click(emo[0]);

  expect(emo[0].parentElement.getAttribute("data-clipboard-text")).toEqual(
    "😀"
  );
});
