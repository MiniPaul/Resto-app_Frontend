export default function resultsDirection(resultsDirection = [], action) {
  if (action.type === "saveResultsDirection") {
    let resultsDirectionCopy = [...resultsDirection, action.resultsDirection];

    return resultsDirectionCopy;
  } else {
    return resultsDirection;
  }
}
