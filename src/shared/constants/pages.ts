export class PAGES {
  static readonly INDEX = "/";

  static readonly AUTH = this.INDEX + "auth";
  static readonly REGISTRATION_FLOW = this.AUTH + "/registration";
  static readonly LOGIN_FLOW = this.AUTH + "/login";
  static readonly RECOVERY_FLOW = this.AUTH + "/recovery";
  static readonly VERIFICATION_FLOW = this.AUTH + "/verification";

  static readonly SETTINGS_FLOW = this.INDEX + "settings";
}
