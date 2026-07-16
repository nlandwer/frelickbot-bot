async function main() {
  const client = new RealClient();

  client.loadSession();

  console.log("==========================");
  console.log("FrelickBot Bot Started");
  console.log("==========================");

  const result = await client.postToGroup("FrelickBot test post");

  console.log("Post result:");
  console.log(result);
}

main().catch(console.error);
