"use client";

import { type OryFlowComponentOverrides } from "@ory/elements-react";
import OryButton from "@/components/ory/node/button";
import OryInput from "@/components/ory/node/input";
import OryLabel from "@/components/ory/node/label";
import OryCardHeader from "@/components/ory/card/header";
import OryCardContent from "@/components/ory/card/content";
import OryCardRoot from "@/components/ory/card/root";
import OryCardFooter from "@/components/ory/card/footer";
import OryFormGroup from "@/components/ory/form/group";
import OryMessageToast from "@/components/ory/message/toast";
import OryMessageContent from "@/components/ory/message/content";
import OryPinCodeInput from "@/components/ory/node/pin-code-input";
import OryAnchor from "@/components/ory/node/anchor";
import OryCardSettingsSection from "@/components/ory/card/settings/section";
import OryCardSettingsSectionContent from "@/components/ory/card/settings/content";
import OryCardSettingsSectionFooter from "@/components/ory/card/settings/footer";
import OryNodeImage from "@/components/ory/node/image";
import OrySsoButton from "@/components/ory/card/sso-button";
import OryFormSsoRoot from "@/components/ory/form/sso-root";
import OryFormSsoSettings from "@/components/ory/form/sso-settings";
import OryPageHeader from "@/components/ory/page/header";
import OryConsentScopeCheckbox from "@/components/ory/node/consent-scope-checkbox";

export const myCustomComponents: OryFlowComponentOverrides = {
  Node: {
    Anchor: OryAnchor,
    Button: OryButton,
    Input: OryInput,
    Label: OryLabel,
    CodeInput: OryPinCodeInput,
    Image: OryNodeImage,
    SsoButton: OrySsoButton,
    ConsentScopeCheckbox: OryConsentScopeCheckbox,
  },
  Card: {
    Root: OryCardRoot,
    Content: OryCardContent,
    Header: OryCardHeader,
    Footer: OryCardFooter,
    SettingsSection: OryCardSettingsSection,
    SettingsSectionContent: OryCardSettingsSectionContent,
    SettingsSectionFooter: OryCardSettingsSectionFooter,
  },
  Form: {
    Group: OryFormGroup,
    SsoRoot: OryFormSsoRoot,
    SsoSettings: OryFormSsoSettings,
  },
  Message: {
    Toast: OryMessageToast,
    Content: OryMessageContent,
  },
  Page: {
    Header: OryPageHeader,
  },
};
