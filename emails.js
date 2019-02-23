/*
ASSIGNMENT
Every email consists of a local name and a domain name, separated by the @ sign.
For example, in alice@viirtue.com, alice is the local name, and viirtue.com is the domain name.
Besides lowercase letters, these emails may contain '.'s or '+'s.
If you add periods ('.') between some characters in the local name part of an email address,
mail sent there will be forwarded to the same address without dots in the local name.  For example, "alice.z@viirtue.com" and "alicez@viirtue.com" forward to the same email address.  (Note that this rule does not apply for domain names.)
If you add a plus ('+') in the local name, everything after the first plus sign will be ignored.
This allows certain emails to be filtered, for example m.y+name@email.com will be forwarded to my@email.com.
(Again, this rule does not apply for domain names.)
It is possible to use both of these rules at the same time.
Given a list of emails, we send one email to each address in the list.  How many different addresses actually receive mails?
Example:
Input: ["test.email+alex@viirtue.com","test.e.mail+bob.cathy@viirtue.com","testemail+david@viir.tue.com"]
Output: 2
Explanation: "testemail@viirtue.com" and "testemail@viir.tue.com" actually receive mails

Note: Each emails[i] contains exactly one '@' character.
*/

/* CM - Notes
each email has two parts, a "local" name and a "domain" name separated by @
local name rules:
  periods are ignored, strings concatenated to ignore
  after the first plus, ignore everything after until @, concatenated

logic
  1. strip all email strings down according to the rules
  2. add them all to a list (while checking for duplicates)
  3. return the count of the list
*/

// helper functions

// main string editing function - @param is a string representing an email
function stripEmailString (emailString) {

  // to get the local name, we get everything before the @ sign
  const localName = emailString.substring(0, emailString.indexOf('@'));

  // to replace all instances of a period, we use regex with "g" flag to replace every instance of ".", replace it with an empty string
  const localNameWithoutPeriod = localName.replace(/\./g, '');

  // get the string before the first "+", disregarding everything after it
  const localNameStrippedPlus = localNameWithoutPeriod.substring(0, localNameWithoutPeriod.indexOf('+'));

  // reconstruct the string using the original domain name
  const newEmailString = localNameStrippedPlus + emailString.substring(emailString.indexOf('@'));
  return newEmailString;
}

// strips all the email strings in an array "arr" passed (callback for foreach)
function stripAllEmailsInArray (email, index, arr) {
  arr[index] = stripEmailString (email);
}

// keeping things tidy with a main function
function main()
{
  // assessment test cases
  let emails = ["test.email+alex@viirtue.com",
                "test.e.mail+bob.cathy@viirtue.com",
                "testemail+david@viir.tue.com"];

  // for every email in this array, strip them and replace their values in emails
  emails.forEach(stripAllEmailsInArray);

  // create a result array 
  let result = [];

  // iterates through every stripped email, disregarding duplicates adding to result
  emails.forEach(function(email) {
    if (!result.includes(email)) {
      result.push(email);
    }
  });

  // output string construction
  let explanation = "Explanation: ";
  result.forEach(function(result) {
    explanation += "\"" + result + "\" ";
  });
  explanation += "actually receive emails.";

  // actual output - the length of the result array is the correct answer
  console.log(explanation);
  console.log("Number of emails to send: " + result.length);
}

main();

