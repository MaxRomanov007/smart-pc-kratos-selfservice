import { Configuration, OAuth2Api } from "@ory/client-fetch";
import {
  Button,
  Card,
  Container,
  Grid,
  List,
  Stack,
  Text,
} from "@chakra-ui/react";
import LinkButton from "@/components/ui/buttons/link-button";
import { PAGES } from "@/shared/constants/pages";
import LogoutLink from "@/components/ui/link/logout-link";
import Form from "next/form";

const ory = new OAuth2Api(
  new Configuration({
    basePath: `http://localhost:4445`,
  }),
);

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ consent_challenge?: string }>;
}) {
  const consentChallenge = (await searchParams).consent_challenge;

  if (!consentChallenge) {
    return <div>Missing consent_challenge</div>;
  }
  const consentRequest = await ory.getOAuth2ConsentRequest({
    consentChallenge,
  });

  const clientName =
    consentRequest.client?.client_name ||
    consentRequest.client?.client_id ||
    "Unknown Client";

  return (
    <Container maxW={["full", "md"]}>
      <Card.Root w="full">
        <Card.Header>
          <Card.Title>Are you sure?</Card.Title>
          <Card.Description>Are you sure that you want to access service {clientName} to use</Card.Description>
        </Card.Header>
        <Card.Body>
          <List.Root w="full" gap="4" ml={5}>
            {consentRequest.requested_scope?.map((scope) => (
              <List.Item key={scope}>
                {scope}
              </List.Item>
            ))}
          </List.Root>
        </Card.Body>
        <Card.Footer>
          <form action="/api/consent" method="post" style={{ width: "100%" }}>
            <input
              type="hidden"
              name="consent_challenge"
              value={consentChallenge}
            />
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <Button
                type="submit"
                name="submit"
                value="accept"
              >
                Accept
              </Button>
              <Button
                type="submit"
                name="submit"
                value="reject"
              >
                Reject
              </Button>
            </Grid>
          </form>
        </Card.Footer>
      </Card.Root>
    </Container>
  )
}
