// Parsing Valid Characters
function parseValidChar(input) {
  // This is a stub
}

// Parsing digits
function parseDigit(input) {
  // This is a stub
}

// Parsing numbers
function parseNumber(input) {
  // This is a stub
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