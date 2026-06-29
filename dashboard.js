import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "YOUR_SUPABASE_URL",
  "YOUR_SUPABASE_KEY"
);

window.sendAction = async function(ecosystem, action) {

  document.getElementById("status").innerText =
    "Sending: " + action + " → " + ecosystem;

  const { data, error } = await supabase
    .from("system_controls")
    .insert([
      {
        ecosystem: ecosystem,
        action: action,
        status: "pending"
      }
    ]);

  if (error) {
    document.getElementById("status").innerText =
      "Error: " + error.message;
    return;
  }

  document.getElementById("status").innerText =
    "Success ✔ " + action + " queued for " + ecosystem;
};
