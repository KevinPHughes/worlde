import "./App.css";
import { observer } from "mobx-react-lite";
import Game from "./stores/Game.js";
import {
  TextField,
  Typography,
  Grid,
  Button,
  Alert,
  Chip,
  Container,
} from "@mui/material";
const $ = require("jquery");

const keyBoard = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M", "⌫"],
];
const App = observer(() => {
  const onLetterInput = (e, position) => {
    Game.recordLetter(e.currentTarget.value.slice(-1).toUpperCase(), position);
    if (e.currentTarget.value) {
      $(e.currentTarget)
        .parent()
        .parent()
        .parent()
        .next()
        .find("input")
        .select(); // select next input
    }
  };

  const handleSpecialKeys = (e) => {
    if (e.key === "Backspace") {
      $(e.currentTarget).parent().prev().find("input").select(); // select next input
    }
    if (e.key === "Enter" && !Game.currentGuess.includes("")) {
      Game.submitGuess();
    }
  };

  const handleOnScreenKeyboardClick = (letter) => {
    console.log(Game.currentGuess);
    let nextEmptySpace = Game.currentGuess.indexOf(undefined);
    Game.recordLetter(letter, nextEmptySpace);
  };

  const getColorForPreviousGuess = (guess, position) => {
    const result = Game.getGuessLocationInWord(
      guess.charAt(position),
      position
    );
    if (result.none) {
      return "primary";
    }

    return result.correct ? "success" : "warning";
  };

  const getColorForLetters = (letter) => {
    const result = Game.getStatusOfLetterInPreviousGuesses(letter);
    if (result.neverUsed) {
      return "primary";
    }

    return result.match ? "success" : "default";
  };

  return (
    <div className="App">
      <header className="App-header">
        <Typography variant="h2">Kevin's Wordle</Typography>
      </header>
      <Container>
        {Game.wordGuesses.map((guess, index) => {
          return (
            <Grid
              key={index}
              container
              spacing={2}
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "1em",
                marginBottom: "1em",
              }}
            >
              <Grid item xs={2}>
                <TextField
                  inputProps={{ maxLength: 1 }}
                  value={guess.charAt(0)}
                  variant="outlined"
                  color={getColorForPreviousGuess(guess, 0)}
                  focused
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  inputProps={{ maxLength: 1 }}
                  value={guess.charAt(1)}
                  variant="outlined"
                  color={getColorForPreviousGuess(guess, 1)}
                  focused
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  inputProps={{ maxLength: 1 }}
                  value={guess.charAt(2)}
                  variant="outlined"
                  color={getColorForPreviousGuess(guess, 2)}
                  focused
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  inputProps={{ maxLength: 1 }}
                  value={guess.charAt(3)}
                  variant="outlined"
                  color={getColorForPreviousGuess(guess, 3)}
                  focused
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  inputProps={{ maxLength: 1 }}
                  value={guess.charAt(4)}
                  color={getColorForPreviousGuess(guess, 4)}
                  variant="outlined"
                  focused
                />
              </Grid>
            </Grid>
          );
        })}
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1em",
            marginBottom: "1em",
          }}
        >
          <Grid item xs={2}>
            <TextField
              onChange={(e) => onLetterInput(e, 0)}
              onKeyUp={(e) => handleSpecialKeys(e)}
              value={Game.currentGuess[0] || ""}
              InputProps={{ fontSize: "2em", textalign: "center" }}
              variant="filled"
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              variant="filled"
              onChange={(e) => onLetterInput(e, 1)}
              onKeyUp={(e) => handleSpecialKeys(e)}
              InputProps={{ fontSize: "2em", textalign: "center" }}
              value={Game.currentGuess[1] || ""}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              variant="filled"
              onChange={(e) => onLetterInput(e, 2)}
              onKeyUp={(e) => handleSpecialKeys(e)}
              InputProps={{ fontSize: "2em", textalign: "center" }}
              value={Game.currentGuess[2] || ""}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              variant="filled"
              onChange={(e) => onLetterInput(e, 3)}
              onKeyUp={(e) => handleSpecialKeys(e)}
              InputProps={{ fontSize: "2em", textalign: "center" }}
              value={Game.currentGuess[3] || ""}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              variant="filled"
              onChange={(e) => onLetterInput(e, 4)}
              onKeyUp={(e) => handleSpecialKeys(e)}
              InputProps={{ fontSize: "2em", textalign: "center" }}
              value={Game.currentGuess[4] || ""}
            />
          </Grid>
        </Grid>
        <Grid sx={{ display: "flex", justifyContent: "center" }}>
          <Button color="info" onClick={() => Game.resetGuess()}>
            Clear
          </Button>
          <Button color="success" onClick={() => Game.submitGuess()}>
            Submit
          </Button>
        </Grid>
        <Grid sx={{ display: "flex", justifyContent: "center" }}>
          {Game.isCurrentWordInvalid ? (
            <Alert severity="error">This is not a valid word</Alert>
          ) : null}
        </Grid>
        <Grid container style={{ marginTop: "2em" }}>
          {keyBoard.map((row, index) => {
            return (
              <Grid
                container
                key={index}
                sx={{ justifyContent: "space-around", marginBottom: ".5em" }}
              >
                {row.map((key, index) => {
                  return (
                    <Grid key={index} item xs={1} sx={{marginRight: '.25em'}}>
                      <Chip
                        key={index}
                        label={key}
                        color={getColorForLetters(key)}
                        onClick={(e) => handleOnScreenKeyboardClick(key)}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
});

export default App;
