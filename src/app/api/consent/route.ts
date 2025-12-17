import { NextRequest, NextResponse } from "next/server";
import { Configuration, OAuth2Api } from "@ory/client-fetch";
import { getServerSession } from "@ory/nextjs/app";

const hydraAdmin = new OAuth2Api(
  new Configuration({
    basePath: `http://localhost:4445`,
  }),
);

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const consentChallenge = formData.get("consent_challenge") as string;
  const submit = formData.get("submit") as string;

  if (!consentChallenge) {
    return new NextResponse("Missing consent_challenge", { status: 400 });
  }

  try {
    const consentRequest = await hydraAdmin.getOAuth2ConsentRequest({
      consentChallenge,
    });
    const session = await getServerSession();
    const traits = session?.identity?.traits as {
      email: string;
      name: {
        first: string;
        last: string;
      };
    };

    if (submit === "accept") {
      const acceptResponse = await hydraAdmin.acceptOAuth2ConsentRequest({
        consentChallenge,
        acceptOAuth2ConsentRequest: {
          grant_scope: consentRequest.requested_scope,
          grant_access_token_audience:
            consentRequest.requested_access_token_audience,
          remember: true,
          remember_for: 3600,
          session: {
            access_token: { email: traits.email, traits: traits },
            id_token: {
              email: traits.email,
              name: traits.name,
              traits: traits,
            },
          },
        },
      });
      return NextResponse.redirect(acceptResponse.redirect_to);
    } else {
      const rejectResponse = await hydraAdmin.rejectOAuth2ConsentRequest({
        consentChallenge,
        rejectOAuth2Request: {
          error: "access_denied",
          error_description: "User denied the request",
        },
      });
      return NextResponse.redirect(rejectResponse.redirect_to);
    }
  } catch (error: any) {
    console.error("Consent POST error:", error.response?.data || error);
    return new NextResponse(`Consent error: ${error.message}`, { status: 500 });
  }
}