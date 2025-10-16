const TOKEN = process.argv.slice(2)[0];
const ENVIRONMENT_ID = "production";
const SERVICE_ID = "<your service id>";

const resp = await fetch("https://backboard.railway.com/graphql/v2", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${TOKEN}`,
  },
  body: JSON.stringify({
    query: `
      mutation ServiceInstanceRedeploy {
          serviceInstanceRedeploy(
              environmentId: "${ENVIRONMENT_ID}"
              serviceId: "${SERVICE_ID}"
          )
      }`,
  }),
});

const data = await resp.json();

if (data.errors) {
  console.error(data.errors);
  throw new Error("Failed to redeploy service");
}

console.log(data);
