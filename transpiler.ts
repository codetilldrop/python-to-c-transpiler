// Parsing Valid Characters
function parseValidChar(input) {
  const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  let char = input[0];
  let returnObject = {
    type: null,
    value: null,
    rest: input
  }

  if (LETTERS.includes(char)) {
    returnObject.type = "char";
    returnObject.value = char;
    returnObject.rest = input.slice(1);
  }

  return returnObject;
}

// Parsing digits
function parseDigit(input) {
  let returnObject = {
    type: null,
    value: null,
    rest: input
  }

  let digit = input[0];

  const DIGITS = "0123456789";

  if (DIGITS.includes(digit)) {
    returnObject.type = "digit";
    returnObject.value = digit;
    returnObject.rest = input.slice(1);
  }

  return returnObject;
}

// Parsing numbers
function parseNumber(input) {
  let strNum = "";
  let returnObject = {
    type: null,
    value: null,
    rest: input
  }

  let digit = parseDigit(input);
  if (digit.type !== null) {
    returnObject.type = "number";
    while (digit.type !== null) {
      strNum += digit.value;
      digit = parseDigit(digit.rest);
    }

    returnObject.value = Number(strNum);
    returnObject.rest = digit.rest;
  }

  return returnObject;
}

// Parsing Declaration
function parseDeclaration(statement) {
  let returnObject = {
    type: null,
    value: null,
    name: null
  }

  statement = parseWhitespace(statement);
  statement = parseIdentifier(statement.rest);
}

// Parsing an Identifier
function parseIdentifier (input) {
  let identifier = "";
  let returnObject = {
    type: null,
    value: null,
    rest: input
  }

  let char = parseValidChar(input);
  if (char.type !== null) {
    returnObject.type = "identifier";
    while (char.type !== null) {
      identifier += char.value;
      char = parseValidChar(char.rest);
      if (char.type === null) {
        char = parseDigit(char.rest);
      }
    }

    returnObject.value = identifier;
    returnObject.rest = char.rest;
  }

  return returnObject;
}

// Parsing Whitespace
function parseWhitespace (input) {
  var returnObject = {
    rest: input
  }

  //var whiteSpaceCounter = 0;

  if (/\s/.test(input[0])) {
    return parseWhitespace(input.slice(1));
  } else {
    return returnObject;
  }
}