import * as CrComLib from "@crestron/ch5-crcomlib/build_bundles/amd/cr-com-lib";

// This function emulates a quick button press, with the button going high
// and the immediately low.
function pulse(join) {
  CrComLib.publishEvent("b", join, true); // Press
  CrComLib.publishEvent("b", join, false); // Release
}

export default function processMutation(store, mutation) {
  // Logging the mutation done here just to show an example of how eruda can be
  // used to debug issues on the panel.
  console.log(mutation);

  // Switch/Case on the mutation type lets us handle each mutation individually
  // This can easily get out of hand for a system with a lot of mutations or
  // commands that need to be sent back to the system.  Consider carefully how
  // you structure your code to minimize code bloat in this function.
  switch (mutation.type) {
    case "lager/setPower": {
      // The mutation payload is a single object that uses destructuring
      // to include however many properties you need.  The payload for the
      // setPower function includes an id and a power boolean.
      switch (mutation.payload.id) {
        case "lagerSlide_1": {
          if (mutation.payload.power) {
            pulse(11);
          }
          break;
        }
        case "lagerSlide_2": {
          if (mutation.payload.power) {
            pulse(12);
          }
          break;
        }
      }
    }
  }
}
