import { n, a as r, i as i$1 } from "./lit__reactive-element.mjs";
import { o, T, e, a as e$1, n as n$1 } from "./lit-html.mjs";
import { i } from "./lit-element.mjs";
import { c as customElement, b as css, U as UiHelperUtil, T as TransactionUtil, M as MathUtil, v as vars, i as initializeTheming } from "./reown__appkit-ui.mjs";
import { O as OptionsController, C as ChainController, w as AssetController, j as AssetUtil, d as CoreHelperUtil, M as ModalController, p as EventsController, h as getPreferredAccountType, R as RouterController, S as StorageUtil, a as ConnectorController, e as ConstantsUtil$2, t as SnackController, i as ConnectionController, x as ExchangeController, y as TransactionsController, z as TooltipController, l as ConnectorUtil, k as ConnectionControllerUtil, f as ApiController, u as WalletUtil, g as AlertController, D as OptionsStateController, F as executeSocialLogin, T as ThemeController, G as AppKitError, H as MobileWalletUtil, r as SIWXUtil, N as NetworkUtil, n as SendController, E as EnsController, I as SwapController, J as BalanceUtil, m as OnRampController, K as ReownAuthentication, L as ModalUtil, q as AdapterController } from "./reown__appkit-controllers.mjs";
import { C as ConstantsUtil$1, D as DateUtil, b as ParseUtil, E as ErrorUtil$1, f as NavigationUtil, c as getW3mThemeVariables, N as NumberUtil, I as InputUtil, S as SafeLocalStorage, a as SafeLocalStorageKeys } from "./reown__appkit-common.mjs";
import { W as W3mFrameRpcConstants, c as W3mFrameProvider, a as W3mFrameStorage, d as W3mFrameHelpers } from "./reown__appkit-wallet.mjs";
import { H as HelpersUtil$1, E as ErrorUtil, a as ConstantsUtil$3, C as CaipNetworksUtil } from "./reown__appkit-utils.mjs";
import { PayController } from "./reown__appkit-pay.mjs";
var __decorate$1L = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
class W3mAccountButtonBase extends i {
  constructor() {
    super(...arguments);
    this.unsubscribe = [];
    this.disabled = false;
    this.balance = "show";
    this.charsStart = 4;
    this.charsEnd = 6;
    this.namespace = void 0;
    this.isSupported = OptionsController.state.allowUnsupportedChain ? true : ChainController.state.activeChain ? ChainController.checkIfSupportedNetwork(ChainController.state.activeChain) : true;
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAccountData(ChainController.getAccountData(this.namespace));
    this.setNetworkData(ChainController.getNetworkData(this.namespace));
  }
  firstUpdated() {
    const namespace = this.namespace;
    if (namespace) {
      this.unsubscribe.push(ChainController.subscribeChainProp("accountState", (val) => {
        this.setAccountData(val);
      }, namespace), ChainController.subscribeChainProp("networkState", (val) => {
        this.setNetworkData(val);
        this.isSupported = ChainController.checkIfSupportedNetwork(namespace, val?.caipNetwork?.caipNetworkId);
      }, namespace));
    } else {
      this.unsubscribe.push(AssetController.subscribeNetworkImages(() => {
        this.networkImage = AssetUtil.getNetworkImage(this.network);
      }), ChainController.subscribeKey("activeCaipAddress", (val) => {
        this.caipAddress = val;
      }), ChainController.subscribeChainProp("accountState", (accountState) => {
        this.setAccountData(accountState);
      }), ChainController.subscribeKey("activeCaipNetwork", (val) => {
        this.network = val;
        this.networkImage = AssetUtil.getNetworkImage(val);
        this.isSupported = val?.chainNamespace ? ChainController.checkIfSupportedNetwork(val?.chainNamespace) : true;
        this.fetchNetworkImage(val);
      }));
    }
  }
  updated() {
    this.fetchNetworkImage(this.network);
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    if (!ChainController.state.activeChain) {
      return null;
    }
    const shouldShowBalance = this.balance === "show";
    const shouldShowLoading = typeof this.balanceVal !== "string";
    const { formattedText } = CoreHelperUtil.parseBalance(this.balanceVal, this.balanceSymbol);
    return T`
      <wui-account-button
        .disabled=${Boolean(this.disabled)}
        .isUnsupportedChain=${OptionsController.state.allowUnsupportedChain ? false : !this.isSupported}
        address=${o(CoreHelperUtil.getPlainAddress(this.caipAddress))}
        profileName=${o(this.profileName)}
        networkSrc=${o(this.networkImage)}
        avatarSrc=${o(this.profileImage)}
        balance=${shouldShowBalance ? formattedText : ""}
        @click=${this.onClick.bind(this)}
        data-testid=${`account-button${this.namespace ? `-${this.namespace}` : ""}`}
        .charsStart=${this.charsStart}
        .charsEnd=${this.charsEnd}
        ?loading=${shouldShowLoading}
      >
      </wui-account-button>
    `;
  }
  onClick() {
    if (this.isSupported || OptionsController.state.allowUnsupportedChain) {
      ModalController.open({ namespace: this.namespace });
    } else {
      ModalController.open({ view: "UnsupportedChain" });
    }
  }
  async fetchNetworkImage(network) {
    if (network?.assets?.imageId) {
      this.networkImage = await AssetUtil.fetchNetworkImage(network?.assets?.imageId);
    }
  }
  setAccountData(accountState) {
    if (!accountState) {
      return;
    }
    this.caipAddress = accountState.caipAddress;
    this.balanceVal = accountState.balance;
    this.balanceSymbol = accountState.balanceSymbol;
    this.profileName = accountState.profileName;
    this.profileImage = accountState.profileImage;
  }
  setNetworkData(networkState) {
    if (!networkState) {
      return;
    }
    this.network = networkState.caipNetwork;
    this.networkImage = AssetUtil.getNetworkImage(networkState.caipNetwork);
  }
}
__decorate$1L([
  n({ type: Boolean })
], W3mAccountButtonBase.prototype, "disabled", void 0);
__decorate$1L([
  n()
], W3mAccountButtonBase.prototype, "balance", void 0);
__decorate$1L([
  n()
], W3mAccountButtonBase.prototype, "charsStart", void 0);
__decorate$1L([
  n()
], W3mAccountButtonBase.prototype, "charsEnd", void 0);
__decorate$1L([
  n()
], W3mAccountButtonBase.prototype, "namespace", void 0);
__decorate$1L([
  r()
], W3mAccountButtonBase.prototype, "caipAddress", void 0);
__decorate$1L([
  r()
], W3mAccountButtonBase.prototype, "balanceVal", void 0);
__decorate$1L([
  r()
], W3mAccountButtonBase.prototype, "balanceSymbol", void 0);
__decorate$1L([
  r()
], W3mAccountButtonBase.prototype, "profileName", void 0);
__decorate$1L([
  r()
], W3mAccountButtonBase.prototype, "profileImage", void 0);
__decorate$1L([
  r()
], W3mAccountButtonBase.prototype, "network", void 0);
__decorate$1L([
  r()
], W3mAccountButtonBase.prototype, "networkImage", void 0);
__decorate$1L([
  r()
], W3mAccountButtonBase.prototype, "isSupported", void 0);
let W3mAccountButton = class W3mAccountButton2 extends W3mAccountButtonBase {
};
W3mAccountButton = __decorate$1L([
  customElement("w3m-account-button")
], W3mAccountButton);
let AppKitAccountButton = class AppKitAccountButton2 extends W3mAccountButtonBase {
};
AppKitAccountButton = __decorate$1L([
  customElement("appkit-account-button")
], AppKitAccountButton);
const styles$1e = i$1`
  :host {
    display: block;
    width: max-content;
  }
`;
var __decorate$1K = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
class W3mButtonBase extends i {
  constructor() {
    super(...arguments);
    this.unsubscribe = [];
    this.disabled = false;
    this.balance = void 0;
    this.size = void 0;
    this.label = void 0;
    this.loadingLabel = void 0;
    this.charsStart = 4;
    this.charsEnd = 6;
    this.namespace = void 0;
  }
  firstUpdated() {
    this.caipAddress = this.namespace ? ChainController.getAccountData(this.namespace)?.caipAddress : ChainController.state.activeCaipAddress;
    if (this.namespace) {
      this.unsubscribe.push(ChainController.subscribeChainProp("accountState", (val) => {
        this.caipAddress = val?.caipAddress;
      }, this.namespace));
    } else {
      this.unsubscribe.push(ChainController.subscribeKey("activeCaipAddress", (val) => this.caipAddress = val));
    }
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    return this.caipAddress ? T`
          <appkit-account-button
            .disabled=${Boolean(this.disabled)}
            balance=${o(this.balance)}
            .charsStart=${o(this.charsStart)}
            .charsEnd=${o(this.charsEnd)}
            namespace=${o(this.namespace)}
          >
          </appkit-account-button>
        ` : T`
          <appkit-connect-button
            size=${o(this.size)}
            label=${o(this.label)}
            loadingLabel=${o(this.loadingLabel)}
            namespace=${o(this.namespace)}
          ></appkit-connect-button>
        `;
  }
}
W3mButtonBase.styles = styles$1e;
__decorate$1K([
  n({ type: Boolean })
], W3mButtonBase.prototype, "disabled", void 0);
__decorate$1K([
  n()
], W3mButtonBase.prototype, "balance", void 0);
__decorate$1K([
  n()
], W3mButtonBase.prototype, "size", void 0);
__decorate$1K([
  n()
], W3mButtonBase.prototype, "label", void 0);
__decorate$1K([
  n()
], W3mButtonBase.prototype, "loadingLabel", void 0);
__decorate$1K([
  n()
], W3mButtonBase.prototype, "charsStart", void 0);
__decorate$1K([
  n()
], W3mButtonBase.prototype, "charsEnd", void 0);
__decorate$1K([
  n()
], W3mButtonBase.prototype, "namespace", void 0);
__decorate$1K([
  r()
], W3mButtonBase.prototype, "caipAddress", void 0);
let W3mButton = class W3mButton2 extends W3mButtonBase {
};
W3mButton = __decorate$1K([
  customElement("w3m-button")
], W3mButton);
let AppKitButton = class AppKitButton2 extends W3mButtonBase {
};
AppKitButton = __decorate$1K([
  customElement("appkit-button")
], AppKitButton);
var __decorate$1J = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
class W3mConnectButtonBase extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.size = "md";
    this.label = "Connect Wallet";
    this.loadingLabel = "Connecting...";
    this.open = ModalController.state.open;
    this.loading = this.namespace ? ModalController.state.loadingNamespaceMap.get(this.namespace) : ModalController.state.loading;
    this.unsubscribe.push(ModalController.subscribe((val) => {
      this.open = val.open;
      this.loading = this.namespace ? val.loadingNamespaceMap.get(this.namespace) : val.loading;
    }));
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    return T`
      <wui-connect-button
        size=${o(this.size)}
        .loading=${this.loading}
        @click=${this.onClick.bind(this)}
        data-testid=${`connect-button${this.namespace ? `-${this.namespace}` : ""}`}
      >
        ${this.loading ? this.loadingLabel : this.label}
      </wui-connect-button>
    `;
  }
  onClick() {
    if (this.open) {
      ModalController.close();
    } else if (!this.loading) {
      ModalController.open({ view: "Connect", namespace: this.namespace });
    }
  }
}
__decorate$1J([
  n()
], W3mConnectButtonBase.prototype, "size", void 0);
__decorate$1J([
  n()
], W3mConnectButtonBase.prototype, "label", void 0);
__decorate$1J([
  n()
], W3mConnectButtonBase.prototype, "loadingLabel", void 0);
__decorate$1J([
  n()
], W3mConnectButtonBase.prototype, "namespace", void 0);
__decorate$1J([
  r()
], W3mConnectButtonBase.prototype, "open", void 0);
__decorate$1J([
  r()
], W3mConnectButtonBase.prototype, "loading", void 0);
let W3mConnectButton = class W3mConnectButton2 extends W3mConnectButtonBase {
};
W3mConnectButton = __decorate$1J([
  customElement("w3m-connect-button")
], W3mConnectButton);
let AppKitConnectButton = class AppKitConnectButton2 extends W3mConnectButtonBase {
};
AppKitConnectButton = __decorate$1J([
  customElement("appkit-connect-button")
], AppKitConnectButton);
const styles$1d = i$1`
  :host {
    display: block;
    width: max-content;
  }
`;
var __decorate$1I = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
class W3mNetworkButtonBase extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.disabled = false;
    this.network = ChainController.state.activeCaipNetwork;
    this.networkImage = AssetUtil.getNetworkImage(this.network);
    this.caipAddress = ChainController.state.activeCaipAddress;
    this.loading = ModalController.state.loading;
    this.isSupported = OptionsController.state.allowUnsupportedChain ? true : ChainController.state.activeChain ? ChainController.checkIfSupportedNetwork(ChainController.state.activeChain) : true;
    this.unsubscribe.push(...[
      AssetController.subscribeNetworkImages(() => {
        this.networkImage = AssetUtil.getNetworkImage(this.network);
      }),
      ChainController.subscribeKey("activeCaipAddress", (val) => {
        this.caipAddress = val;
      }),
      ChainController.subscribeKey("activeCaipNetwork", (val) => {
        this.network = val;
        this.networkImage = AssetUtil.getNetworkImage(val);
        this.isSupported = val?.chainNamespace ? ChainController.checkIfSupportedNetwork(val.chainNamespace) : true;
        AssetUtil.fetchNetworkImage(val?.assets?.imageId);
      }),
      ModalController.subscribeKey("loading", (val) => this.loading = val)
    ]);
  }
  firstUpdated() {
    AssetUtil.fetchNetworkImage(this.network?.assets?.imageId);
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    const isSupported = this.network ? ChainController.checkIfSupportedNetwork(this.network.chainNamespace) : true;
    return T`
      <wui-network-button
        .disabled=${Boolean(this.disabled || this.loading)}
        .isUnsupportedChain=${OptionsController.state.allowUnsupportedChain ? false : !isSupported}
        imageSrc=${o(this.networkImage)}
        @click=${this.onClick.bind(this)}
        data-testid="w3m-network-button"
      >
        ${this.getLabel()}
        <slot></slot>
      </wui-network-button>
    `;
  }
  getLabel() {
    if (this.network) {
      if (!this.isSupported && !OptionsController.state.allowUnsupportedChain) {
        return "Switch Network";
      }
      return this.network.name;
    }
    if (this.label) {
      return this.label;
    }
    if (this.caipAddress) {
      return "Unknown Network";
    }
    return "Select Network";
  }
  onClick() {
    if (!this.loading) {
      EventsController.sendEvent({ type: "track", event: "CLICK_NETWORKS" });
      ModalController.open({ view: "Networks" });
    }
  }
}
W3mNetworkButtonBase.styles = styles$1d;
__decorate$1I([
  n({ type: Boolean })
], W3mNetworkButtonBase.prototype, "disabled", void 0);
__decorate$1I([
  n({ type: String })
], W3mNetworkButtonBase.prototype, "label", void 0);
__decorate$1I([
  r()
], W3mNetworkButtonBase.prototype, "network", void 0);
__decorate$1I([
  r()
], W3mNetworkButtonBase.prototype, "networkImage", void 0);
__decorate$1I([
  r()
], W3mNetworkButtonBase.prototype, "caipAddress", void 0);
__decorate$1I([
  r()
], W3mNetworkButtonBase.prototype, "loading", void 0);
__decorate$1I([
  r()
], W3mNetworkButtonBase.prototype, "isSupported", void 0);
let W3mNetworkButton = class W3mNetworkButton2 extends W3mNetworkButtonBase {
};
W3mNetworkButton = __decorate$1I([
  customElement("w3m-network-button")
], W3mNetworkButton);
let AppKitNetworkButton = class AppKitNetworkButton2 extends W3mNetworkButtonBase {
};
AppKitNetworkButton = __decorate$1I([
  customElement("appkit-network-button")
], AppKitNetworkButton);
const styles$1c = css`
  :host wui-ux-by-reown {
    padding-top: 0;
  }

  :host wui-ux-by-reown.branding-only {
    padding-top: ${({ spacing }) => spacing["3"]};
  }

  a {
    text-decoration: none;
    color: ${({ tokens }) => tokens.core.textAccentPrimary};
    font-weight: 500;
  }
`;
var __decorate$1H = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mLegalFooter = class W3mLegalFooter2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.remoteFeatures = OptionsController.state.remoteFeatures;
    this.unsubscribe.push(OptionsController.subscribeKey("remoteFeatures", (val) => this.remoteFeatures = val));
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    const { termsConditionsUrl, privacyPolicyUrl } = OptionsController.state;
    const legalCheckbox = OptionsController.state.features?.legalCheckbox;
    const showOnlyBranding = !termsConditionsUrl && !privacyPolicyUrl || legalCheckbox;
    if (showOnlyBranding) {
      return T`
        <wui-flex flexDirection="column"> ${this.reownBrandingTemplate(true)} </wui-flex>
      `;
    }
    return T`
      <wui-flex flexDirection="column">
        <wui-flex .padding=${["4", "3", "3", "3"]} justifyContent="center">
          <wui-text color="secondary" variant="md-regular" align="center">
            By connecting your wallet, you agree to our <br />
            ${this.termsTemplate()} ${this.andTemplate()} ${this.privacyTemplate()}
          </wui-text>
        </wui-flex>
        ${this.reownBrandingTemplate()}
      </wui-flex>
    `;
  }
  andTemplate() {
    const { termsConditionsUrl, privacyPolicyUrl } = OptionsController.state;
    return termsConditionsUrl && privacyPolicyUrl ? "and" : "";
  }
  termsTemplate() {
    const { termsConditionsUrl } = OptionsController.state;
    if (!termsConditionsUrl) {
      return null;
    }
    return T`<a href=${termsConditionsUrl} target="_blank" rel="noopener noreferrer"
      >Terms of Service</a
    >`;
  }
  privacyTemplate() {
    const { privacyPolicyUrl } = OptionsController.state;
    if (!privacyPolicyUrl) {
      return null;
    }
    return T`<a href=${privacyPolicyUrl} target="_blank" rel="noopener noreferrer"
      >Privacy Policy</a
    >`;
  }
  reownBrandingTemplate(showOnlyBranding = false) {
    if (!this.remoteFeatures?.reownBranding) {
      return null;
    }
    if (showOnlyBranding) {
      return T`<wui-ux-by-reown class="branding-only"></wui-ux-by-reown>`;
    }
    return T`<wui-ux-by-reown></wui-ux-by-reown>`;
  }
};
W3mLegalFooter.styles = [styles$1c];
__decorate$1H([
  r()
], W3mLegalFooter.prototype, "remoteFeatures", void 0);
W3mLegalFooter = __decorate$1H([
  customElement("w3m-legal-footer")
], W3mLegalFooter);
const styles$1b = i$1``;
var __decorate$1G = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mOnRampProvidersFooter = class W3mOnRampProvidersFooter2 extends i {
  render() {
    const { termsConditionsUrl, privacyPolicyUrl } = OptionsController.state;
    if (!termsConditionsUrl && !privacyPolicyUrl) {
      return null;
    }
    return T`
      <wui-flex
        .padding=${["4", "3", "3", "3"]}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap="3"
      >
        <wui-text color="secondary" variant="md-regular" align="center">
          We work with the best providers to give you the lowest fees and best support. More options
          coming soon!
        </wui-text>

        ${this.howDoesItWorkTemplate()}
      </wui-flex>
    `;
  }
  howDoesItWorkTemplate() {
    return T` <wui-link @click=${this.onWhatIsBuy.bind(this)}>
      <wui-icon size="xs" color="accent-primary" slot="iconLeft" name="helpCircle"></wui-icon>
      How does it work?
    </wui-link>`;
  }
  onWhatIsBuy() {
    EventsController.sendEvent({
      type: "track",
      event: "SELECT_WHAT_IS_A_BUY",
      properties: {
        isSmartAccount: getPreferredAccountType(ChainController.state.activeChain) === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT
      }
    });
    RouterController.push("WhatIsABuy");
  }
};
W3mOnRampProvidersFooter.styles = [styles$1b];
W3mOnRampProvidersFooter = __decorate$1G([
  customElement("w3m-onramp-providers-footer")
], W3mOnRampProvidersFooter);
const ConstantsUtil = {
  ACCOUNT_TABS: [{ label: "Tokens" }, { label: "Activity" }],
  SECURE_SITE_ORIGIN: (typeof process !== "undefined" && typeof process.env !== "undefined" ? process.env["NEXT_PUBLIC_SECURE_SITE_ORIGIN"] : void 0) || "https://secure.walletconnect.org",
  VIEW_DIRECTION: {
    Next: "next",
    Prev: "prev"
  },
  ANIMATION_DURATIONS: {
    HeaderText: 120
  },
  VIEWS_WITH_LEGAL_FOOTER: [
    "Connect",
    "ConnectWallets",
    "OnRampTokenSelect",
    "OnRampFiatSelect",
    "OnRampProviders"
  ],
  VIEWS_WITH_DEFAULT_FOOTER: ["Networks"]
};
const HelpersUtil = {
  getTabsByNamespace(namespace) {
    const isEVM = Boolean(namespace) && namespace === ConstantsUtil$1.CHAIN.EVM;
    if (!isEVM) {
      return [];
    }
    if (OptionsController.state.remoteFeatures?.activity === false) {
      return ConstantsUtil.ACCOUNT_TABS.filter((tab) => tab.label !== "Activity");
    }
    return ConstantsUtil.ACCOUNT_TABS;
  },
  isValidReownName(name) {
    return /^[a-zA-Z0-9]+$/gu.test(name);
  },
  isValidEmail(email2) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/gu.test(email2);
  },
  validateReownName(name) {
    const sanitizedName = name.replace(/\^/gu, "").toLowerCase();
    return sanitizedName.replace(/[^a-zA-Z0-9]/gu, "");
  },
  hasFooter() {
    const view = RouterController.state.view;
    if (ConstantsUtil.VIEWS_WITH_LEGAL_FOOTER.includes(view)) {
      const { termsConditionsUrl, privacyPolicyUrl } = OptionsController.state;
      const legalCheckbox = OptionsController.state.features?.legalCheckbox;
      const showOnlyBranding = !termsConditionsUrl && !privacyPolicyUrl || legalCheckbox;
      if (showOnlyBranding) {
        return false;
      }
      return true;
    }
    return ConstantsUtil.VIEWS_WITH_DEFAULT_FOOTER.includes(view);
  }
};
const styles$1a = css`
  :host {
    display: block;
  }

  div.container {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    height: auto;
    display: block;
  }

  div.container[status='hide'] {
    animation: fade-out;
    animation-duration: var(--apkt-duration-dynamic);
    animation-timing-function: ${({ easings }) => easings["ease-out-power-2"]};
    animation-fill-mode: both;
    animation-delay: 0s;
  }

  div.container[status='show'] {
    animation: fade-in;
    animation-duration: var(--apkt-duration-dynamic);
    animation-timing-function: ${({ easings }) => easings["ease-out-power-2"]};
    animation-fill-mode: both;
    animation-delay: var(--apkt-duration-dynamic);
  }

  @keyframes fade-in {
    from {
      opacity: 0;
      filter: blur(6px);
    }
    to {
      opacity: 1;
      filter: blur(0px);
    }
  }

  @keyframes fade-out {
    from {
      opacity: 1;
      filter: blur(0px);
    }
    to {
      opacity: 0;
      filter: blur(6px);
    }
  }
`;
var __decorate$1F = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mFooter = class W3mFooter2 extends i {
  constructor() {
    super(...arguments);
    this.resizeObserver = void 0;
    this.unsubscribe = [];
    this.status = "hide";
    this.view = RouterController.state.view;
  }
  firstUpdated() {
    this.status = HelpersUtil.hasFooter() ? "show" : "hide";
    this.unsubscribe.push(RouterController.subscribeKey("view", (val) => {
      this.view = val;
      this.status = HelpersUtil.hasFooter() ? "show" : "hide";
      if (this.status === "hide") {
        const globalStyles = document.documentElement.style;
        globalStyles.setProperty("--apkt-footer-height", "0px");
      }
    }));
    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === this.getWrapper()) {
          const newHeight = `${entry.contentRect.height}px`;
          const globalStyles = document.documentElement.style;
          globalStyles.setProperty("--apkt-footer-height", newHeight);
        }
      }
    });
    this.resizeObserver.observe(this.getWrapper());
  }
  render() {
    return T`
      <div class="container" status=${this.status}>${this.templatePageContainer()}</div>
    `;
  }
  templatePageContainer() {
    if (HelpersUtil.hasFooter()) {
      return T` ${this.templateFooter()}`;
    }
    return null;
  }
  templateFooter() {
    switch (this.view) {
      case "Networks":
        return this.templateNetworksFooter();
      case "Connect":
      case "ConnectWallets":
      case "OnRampFiatSelect":
      case "OnRampTokenSelect":
        return T`<w3m-legal-footer></w3m-legal-footer>`;
      case "OnRampProviders":
        return T`<w3m-onramp-providers-footer></w3m-onramp-providers-footer>`;
      default:
        return null;
    }
  }
  templateNetworksFooter() {
    return T` <wui-flex
      class="footer-in"
      padding="3"
      flexDirection="column"
      gap="3"
      alignItems="center"
    >
      <wui-text variant="md-regular" color="secondary" align="center">
        Your connected wallet may not support some of the networks available for this dApp
      </wui-text>
      <wui-link @click=${this.onNetworkHelp.bind(this)}>
        <wui-icon size="sm" color="accent-primary" slot="iconLeft" name="helpCircle"></wui-icon>
        What is a network
      </wui-link>
    </wui-flex>`;
  }
  onNetworkHelp() {
    EventsController.sendEvent({ type: "track", event: "CLICK_NETWORK_HELP" });
    RouterController.push("WhatIsANetwork");
  }
  getWrapper() {
    return this.shadowRoot?.querySelector("div.container");
  }
};
W3mFooter.styles = [styles$1a];
__decorate$1F([
  r()
], W3mFooter.prototype, "status", void 0);
__decorate$1F([
  r()
], W3mFooter.prototype, "view", void 0);
W3mFooter = __decorate$1F([
  customElement("w3m-footer")
], W3mFooter);
const styles$19 = css`
  :host {
    display: block;
    width: inherit;
  }
`;
var __decorate$1E = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mRouter = class W3mRouter2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.viewState = RouterController.state.view;
    this.history = RouterController.state.history.join(",");
    this.unsubscribe.push(RouterController.subscribeKey("view", () => {
      this.history = RouterController.state.history.join(",");
      document.documentElement.style.setProperty("--apkt-duration-dynamic", "var(--apkt-durations-lg)");
    }));
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
    document.documentElement.style.setProperty("--apkt-duration-dynamic", "0s");
  }
  render() {
    return T`${this.templatePageContainer()}`;
  }
  templatePageContainer() {
    return T`<w3m-router-container
      history=${this.history}
      .setView=${() => {
      this.viewState = RouterController.state.view;
    }}
    >
      ${this.viewTemplate(this.viewState)}
    </w3m-router-container>`;
  }
  viewTemplate(view) {
    switch (view) {
      case "AccountSettings":
        return T`<w3m-account-settings-view></w3m-account-settings-view>`;
      case "Account":
        return T`<w3m-account-view></w3m-account-view>`;
      case "AllWallets":
        return T`<w3m-all-wallets-view></w3m-all-wallets-view>`;
      case "ApproveTransaction":
        return T`<w3m-approve-transaction-view></w3m-approve-transaction-view>`;
      case "BuyInProgress":
        return T`<w3m-buy-in-progress-view></w3m-buy-in-progress-view>`;
      case "ChooseAccountName":
        return T`<w3m-choose-account-name-view></w3m-choose-account-name-view>`;
      case "Connect":
        return T`<w3m-connect-view></w3m-connect-view>`;
      case "Create":
        return T`<w3m-connect-view walletGuide="explore"></w3m-connect-view>`;
      case "ConnectingWalletConnect":
        return T`<w3m-connecting-wc-view></w3m-connecting-wc-view>`;
      case "ConnectingWalletConnectBasic":
        return T`<w3m-connecting-wc-basic-view></w3m-connecting-wc-basic-view>`;
      case "ConnectingExternal":
        return T`<w3m-connecting-external-view></w3m-connecting-external-view>`;
      case "ConnectingSiwe":
        return T`<w3m-connecting-siwe-view></w3m-connecting-siwe-view>`;
      case "ConnectWallets":
        return T`<w3m-connect-wallets-view></w3m-connect-wallets-view>`;
      case "ConnectSocials":
        return T`<w3m-connect-socials-view></w3m-connect-socials-view>`;
      case "ConnectingSocial":
        return T`<w3m-connecting-social-view></w3m-connecting-social-view>`;
      case "DataCapture":
        return T`<w3m-data-capture-view></w3m-data-capture-view>`;
      case "DataCaptureOtpConfirm":
        return T`<w3m-data-capture-otp-confirm-view></w3m-data-capture-otp-confirm-view>`;
      case "Downloads":
        return T`<w3m-downloads-view></w3m-downloads-view>`;
      case "EmailLogin":
        return T`<w3m-email-login-view></w3m-email-login-view>`;
      case "EmailVerifyOtp":
        return T`<w3m-email-verify-otp-view></w3m-email-verify-otp-view>`;
      case "EmailVerifyDevice":
        return T`<w3m-email-verify-device-view></w3m-email-verify-device-view>`;
      case "GetWallet":
        return T`<w3m-get-wallet-view></w3m-get-wallet-view>`;
      case "Networks":
        return T`<w3m-networks-view></w3m-networks-view>`;
      case "SwitchNetwork":
        return T`<w3m-network-switch-view></w3m-network-switch-view>`;
      case "ProfileWallets":
        return T`<w3m-profile-wallets-view></w3m-profile-wallets-view>`;
      case "Transactions":
        return T`<w3m-transactions-view></w3m-transactions-view>`;
      case "OnRampProviders":
        return T`<w3m-onramp-providers-view></w3m-onramp-providers-view>`;
      case "OnRampTokenSelect":
        return T`<w3m-onramp-token-select-view></w3m-onramp-token-select-view>`;
      case "OnRampFiatSelect":
        return T`<w3m-onramp-fiat-select-view></w3m-onramp-fiat-select-view>`;
      case "UpgradeEmailWallet":
        return T`<w3m-upgrade-wallet-view></w3m-upgrade-wallet-view>`;
      case "UpdateEmailWallet":
        return T`<w3m-update-email-wallet-view></w3m-update-email-wallet-view>`;
      case "UpdateEmailPrimaryOtp":
        return T`<w3m-update-email-primary-otp-view></w3m-update-email-primary-otp-view>`;
      case "UpdateEmailSecondaryOtp":
        return T`<w3m-update-email-secondary-otp-view></w3m-update-email-secondary-otp-view>`;
      case "UnsupportedChain":
        return T`<w3m-unsupported-chain-view></w3m-unsupported-chain-view>`;
      case "Swap":
        return T`<w3m-swap-view></w3m-swap-view>`;
      case "SwapSelectToken":
        return T`<w3m-swap-select-token-view></w3m-swap-select-token-view>`;
      case "SwapPreview":
        return T`<w3m-swap-preview-view></w3m-swap-preview-view>`;
      case "WalletSend":
        return T`<w3m-wallet-send-view></w3m-wallet-send-view>`;
      case "WalletSendSelectToken":
        return T`<w3m-wallet-send-select-token-view></w3m-wallet-send-select-token-view>`;
      case "WalletSendPreview":
        return T`<w3m-wallet-send-preview-view></w3m-wallet-send-preview-view>`;
      case "WalletSendConfirmed":
        return T`<w3m-send-confirmed-view></w3m-send-confirmed-view>`;
      case "WhatIsABuy":
        return T`<w3m-what-is-a-buy-view></w3m-what-is-a-buy-view>`;
      case "WalletReceive":
        return T`<w3m-wallet-receive-view></w3m-wallet-receive-view>`;
      case "WalletCompatibleNetworks":
        return T`<w3m-wallet-compatible-networks-view></w3m-wallet-compatible-networks-view>`;
      case "WhatIsAWallet":
        return T`<w3m-what-is-a-wallet-view></w3m-what-is-a-wallet-view>`;
      case "ConnectingMultiChain":
        return T`<w3m-connecting-multi-chain-view></w3m-connecting-multi-chain-view>`;
      case "WhatIsANetwork":
        return T`<w3m-what-is-a-network-view></w3m-what-is-a-network-view>`;
      case "ConnectingFarcaster":
        return T`<w3m-connecting-farcaster-view></w3m-connecting-farcaster-view>`;
      case "SwitchActiveChain":
        return T`<w3m-switch-active-chain-view></w3m-switch-active-chain-view>`;
      case "RegisterAccountName":
        return T`<w3m-register-account-name-view></w3m-register-account-name-view>`;
      case "RegisterAccountNameSuccess":
        return T`<w3m-register-account-name-success-view></w3m-register-account-name-success-view>`;
      case "SmartSessionCreated":
        return T`<w3m-smart-session-created-view></w3m-smart-session-created-view>`;
      case "SmartSessionList":
        return T`<w3m-smart-session-list-view></w3m-smart-session-list-view>`;
      case "SIWXSignMessage":
        return T`<w3m-siwx-sign-message-view></w3m-siwx-sign-message-view>`;
      case "Pay":
        return T`<w3m-pay-view></w3m-pay-view>`;
      case "PayLoading":
        return T`<w3m-pay-loading-view></w3m-pay-loading-view>`;
      case "PayQuote":
        return T`<w3m-pay-quote-view></w3m-pay-quote-view>`;
      case "FundWallet":
        return T`<w3m-fund-wallet-view></w3m-fund-wallet-view>`;
      case "PayWithExchange":
        return T`<w3m-deposit-from-exchange-view></w3m-deposit-from-exchange-view>`;
      case "PayWithExchangeSelectAsset":
        return T`<w3m-deposit-from-exchange-select-asset-view></w3m-deposit-from-exchange-select-asset-view>`;
      case "UsageExceeded":
        return T`<w3m-usage-exceeded-view></w3m-usage-exceeded-view>`;
      case "SmartAccountSettings":
        return T`<w3m-smart-account-settings-view></w3m-smart-account-settings-view>`;
      default:
        return T`<w3m-connect-view></w3m-connect-view>`;
    }
  }
};
W3mRouter.styles = [styles$19];
__decorate$1E([
  r()
], W3mRouter.prototype, "viewState", void 0);
__decorate$1E([
  r()
], W3mRouter.prototype, "history", void 0);
W3mRouter = __decorate$1E([
  customElement("w3m-router")
], W3mRouter);
var __decorate$1D = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mAccountAuthButton = class W3mAccountAuthButton2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.socialProvider = StorageUtil.getConnectedSocialProvider();
    this.socialUsername = StorageUtil.getConnectedSocialUsername();
    this.namespace = ChainController.state.activeChain;
    this.unsubscribe.push(ChainController.subscribeKey("activeChain", (namespace) => {
      this.namespace = namespace;
    }));
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsub) => unsub());
  }
  render() {
    const connectorId = ConnectorController.getConnectorId(this.namespace);
    const authConnector = ConnectorController.getAuthConnector();
    if (!authConnector || connectorId !== ConstantsUtil$1.CONNECTOR_ID.AUTH) {
      this.style.cssText = `display: none`;
      return null;
    }
    const email2 = authConnector.provider.getEmail() ?? "";
    if (!email2 && !this.socialUsername) {
      this.style.cssText = `display: none`;
      return null;
    }
    return T`
      <wui-list-item
        ?rounded=${true}
        icon=${this.socialProvider ?? "mail"}
        data-testid="w3m-account-email-update"
        ?chevron=${!this.socialProvider}
        @click=${() => {
      this.onGoToUpdateEmail(email2, this.socialProvider);
    }}
      >
        <wui-text variant="lg-regular" color="primary">${this.getAuthName(email2)}</wui-text>
      </wui-list-item>
    `;
  }
  onGoToUpdateEmail(email2, socialProvider) {
    if (!socialProvider) {
      RouterController.push("UpdateEmailWallet", { email: email2, redirectView: "Account" });
    }
  }
  getAuthName(email2) {
    if (this.socialUsername) {
      if (this.socialProvider === "discord" && this.socialUsername.endsWith("0")) {
        return this.socialUsername.slice(0, -1);
      }
      return this.socialUsername;
    }
    return email2.length > 30 ? `${email2.slice(0, -3)}...` : email2;
  }
};
__decorate$1D([
  r()
], W3mAccountAuthButton.prototype, "namespace", void 0);
W3mAccountAuthButton = __decorate$1D([
  customElement("w3m-account-auth-button")
], W3mAccountAuthButton);
var __decorate$1C = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mAccountSettingsView = class W3mAccountSettingsView2 extends i {
  constructor() {
    super();
    this.usubscribe = [];
    this.networkImages = AssetController.state.networkImages;
    this.address = ChainController.getAccountData()?.address;
    this.profileImage = ChainController.getAccountData()?.profileImage;
    this.profileName = ChainController.getAccountData()?.profileName;
    this.network = ChainController.state.activeCaipNetwork;
    this.disconnecting = false;
    this.remoteFeatures = OptionsController.state.remoteFeatures;
    this.usubscribe.push(...[
      ChainController.subscribeChainProp("accountState", (val) => {
        if (val) {
          this.address = val.address;
          this.profileImage = val.profileImage;
          this.profileName = val.profileName;
        }
      }),
      ChainController.subscribeKey("activeCaipNetwork", (val) => {
        if (val?.id) {
          this.network = val;
        }
      }),
      OptionsController.subscribeKey("remoteFeatures", (val) => {
        this.remoteFeatures = val;
      })
    ]);
  }
  disconnectedCallback() {
    this.usubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    if (!this.address) {
      throw new Error("w3m-account-settings-view: No account provided");
    }
    const networkImage = this.networkImages[this.network?.assets?.imageId ?? ""];
    return T`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="4"
        .padding=${["0", "5", "3", "5"]}
      >
        <wui-avatar
          alt=${this.address}
          address=${this.address}
          imageSrc=${o(this.profileImage)}
          size="lg"
        ></wui-avatar>
        <wui-flex flexDirection="column" alignItems="center">
          <wui-flex gap="1" alignItems="center" justifyContent="center">
            <wui-text variant="h5-medium" color="primary" data-testid="account-settings-address">
              ${UiHelperUtil.getTruncateString({
      string: this.address,
      charsStart: 4,
      charsEnd: 6,
      truncate: "middle"
    })}
            </wui-text>
            <wui-icon-link
              size="md"
              icon="copy"
              iconColor="default"
              @click=${this.onCopyAddress}
            ></wui-icon-link>
          </wui-flex>
        </wui-flex>
      </wui-flex>
      <wui-flex flexDirection="column" gap="4">
        <wui-flex flexDirection="column" gap="2" .padding=${["6", "4", "3", "4"]}>
          ${this.authCardTemplate()}
          <w3m-account-auth-button></w3m-account-auth-button>
          <wui-list-item
            imageSrc=${o(networkImage)}
            ?chevron=${this.isAllowedNetworkSwitch()}
            ?fullSize=${true}
            ?rounded=${true}
            @click=${this.onNetworks.bind(this)}
            data-testid="account-switch-network-button"
          >
            <wui-text variant="lg-regular" color="primary">
              ${this.network?.name ?? "Unknown"}
            </wui-text>
          </wui-list-item>
          ${this.smartAccountSettingsTemplate()} ${this.chooseNameButtonTemplate()}
          <wui-list-item
            ?rounded=${true}
            icon="power"
            iconColor="error"
            ?chevron=${false}
            .loading=${this.disconnecting}
            @click=${this.onDisconnect.bind(this)}
            data-testid="disconnect-button"
          >
            <wui-text variant="lg-regular" color="primary">Disconnect</wui-text>
          </wui-list-item>
        </wui-flex>
      </wui-flex>
    `;
  }
  chooseNameButtonTemplate() {
    const namespace = this.network?.chainNamespace;
    const connectorId = ConnectorController.getConnectorId(namespace);
    const authConnector = ConnectorController.getAuthConnector();
    const hasNetworkSupport = ChainController.checkIfNamesSupported();
    if (!hasNetworkSupport || !authConnector || connectorId !== ConstantsUtil$1.CONNECTOR_ID.AUTH || this.profileName) {
      return null;
    }
    return T`
      <wui-list-item
        icon="id"
        ?rounded=${true}
        ?chevron=${true}
        @click=${this.onChooseName.bind(this)}
        data-testid="account-choose-name-button"
      >
        <wui-text variant="lg-regular" color="primary">Choose account name </wui-text>
      </wui-list-item>
    `;
  }
  authCardTemplate() {
    const connectorId = ConnectorController.getConnectorId(this.network?.chainNamespace);
    const authConnector = ConnectorController.getAuthConnector();
    const { origin } = location;
    if (!authConnector || connectorId !== ConstantsUtil$1.CONNECTOR_ID.AUTH || origin.includes(ConstantsUtil$2.SECURE_SITE)) {
      return null;
    }
    return T`
      <wui-notice-card
        @click=${this.onGoToUpgradeView.bind(this)}
        label="Upgrade your wallet"
        description="Transition to a self-custodial wallet"
        icon="wallet"
        data-testid="w3m-wallet-upgrade-card"
      ></wui-notice-card>
    `;
  }
  isAllowedNetworkSwitch() {
    const requestedCaipNetworks = ChainController.getAllRequestedCaipNetworks();
    const isMultiNetwork = requestedCaipNetworks ? requestedCaipNetworks.length > 1 : false;
    const isValidNetwork = requestedCaipNetworks?.find(({ id }) => id === this.network?.id);
    return isMultiNetwork || !isValidNetwork;
  }
  onCopyAddress() {
    try {
      if (this.address) {
        CoreHelperUtil.copyToClopboard(this.address);
        SnackController.showSuccess("Address copied");
      }
    } catch {
      SnackController.showError("Failed to copy");
    }
  }
  smartAccountSettingsTemplate() {
    const namespace = this.network?.chainNamespace;
    const isNetworkEnabled = ChainController.checkIfSmartAccountEnabled();
    const connectorId = ConnectorController.getConnectorId(namespace);
    const authConnector = ConnectorController.getAuthConnector();
    if (!authConnector || connectorId !== ConstantsUtil$1.CONNECTOR_ID.AUTH || !isNetworkEnabled) {
      return null;
    }
    return T`
      <wui-list-item
        icon="user"
        ?rounded=${true}
        ?chevron=${true}
        @click=${this.onSmartAccountSettings.bind(this)}
        data-testid="account-smart-account-settings-button"
      >
        <wui-text variant="lg-regular" color="primary">Smart Account Settings</wui-text>
      </wui-list-item>
    `;
  }
  onChooseName() {
    RouterController.push("ChooseAccountName");
  }
  onNetworks() {
    if (this.isAllowedNetworkSwitch()) {
      RouterController.push("Networks");
    }
  }
  async onDisconnect() {
    try {
      this.disconnecting = true;
      const namespace = this.network?.chainNamespace;
      const connectionsByNamespace = ConnectionController.getConnections(namespace);
      const hasConnections = connectionsByNamespace.length > 0;
      const connectorId = namespace && ConnectorController.state.activeConnectorIds[namespace];
      const isMultiWalletEnabled = this.remoteFeatures?.multiWallet;
      await ConnectionController.disconnect(isMultiWalletEnabled ? { id: connectorId, namespace } : {});
      if (hasConnections && isMultiWalletEnabled) {
        RouterController.push("ProfileWallets");
        SnackController.showSuccess("Wallet deleted");
      }
    } catch {
      EventsController.sendEvent({
        type: "track",
        event: "DISCONNECT_ERROR",
        properties: { message: "Failed to disconnect" }
      });
      SnackController.showError("Failed to disconnect");
    } finally {
      this.disconnecting = false;
    }
  }
  onGoToUpgradeView() {
    EventsController.sendEvent({ type: "track", event: "EMAIL_UPGRADE_FROM_MODAL" });
    RouterController.push("UpgradeEmailWallet");
  }
  onSmartAccountSettings() {
    RouterController.push("SmartAccountSettings");
  }
};
__decorate$1C([
  r()
], W3mAccountSettingsView.prototype, "address", void 0);
__decorate$1C([
  r()
], W3mAccountSettingsView.prototype, "profileImage", void 0);
__decorate$1C([
  r()
], W3mAccountSettingsView.prototype, "profileName", void 0);
__decorate$1C([
  r()
], W3mAccountSettingsView.prototype, "network", void 0);
__decorate$1C([
  r()
], W3mAccountSettingsView.prototype, "disconnecting", void 0);
__decorate$1C([
  r()
], W3mAccountSettingsView.prototype, "remoteFeatures", void 0);
W3mAccountSettingsView = __decorate$1C([
  customElement("w3m-account-settings-view")
], W3mAccountSettingsView);
const styles$18 = css`
  wui-icon-link {
    margin-right: calc(${({ spacing }) => spacing["8"]} * -1);
  }

  wui-notice-card {
    margin-bottom: ${({ spacing }) => spacing["1"]};
  }

  wui-list-item > wui-text {
    flex: 1;
  }

  w3m-transactions-view {
    max-height: 200px;
  }

  .balance-container {
    display: inline;
  }

  .tab-content-container {
    height: 300px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  .symbol {
    transform: translateY(-2px);
  }

  .tab-content-container::-webkit-scrollbar {
    display: none;
  }

  .account-button {
    width: auto;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({ spacing }) => spacing["3"]};
    height: 48px;
    padding: ${({ spacing }) => spacing["2"]};
    padding-right: ${({ spacing }) => spacing["3"]};
    box-shadow: inset 0 0 0 1px ${({ tokens }) => tokens.theme.foregroundPrimary};
    background-color: ${({ tokens }) => tokens.theme.foregroundPrimary};
    border-radius: ${({ borderRadius }) => borderRadius[6]};
    transition: background-color ${({ durations }) => durations["lg"]}
      ${({ easings }) => easings["ease-out-power-2"]};
  }

  .account-button:hover {
    background-color: ${({ tokens }) => tokens.core.glass010};
  }

  .avatar-container {
    position: relative;
  }

  wui-avatar.avatar {
    width: 32px;
    height: 32px;
    box-shadow: 0 0 0 2px ${({ tokens }) => tokens.core.glass010};
  }

  wui-wallet-switch {
    margin-top: ${({ spacing }) => spacing["2"]};
  }

  wui-avatar.network-avatar {
    width: 16px;
    height: 16px;
    position: absolute;
    left: 100%;
    top: 100%;
    transform: translate(-75%, -75%);
    box-shadow: 0 0 0 2px ${({ tokens }) => tokens.core.glass010};
  }

  .account-links {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .account-links wui-flex {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    background: red;
    align-items: center;
    justify-content: center;
    height: 48px;
    padding: 10px;
    flex: 1 0 0;
    border-radius: var(--XS, 16px);
    border: 1px solid var(--dark-accent-glass-010, rgba(71, 161, 255, 0.1));
    background: var(--dark-accent-glass-010, rgba(71, 161, 255, 0.1));
    transition:
      background-color ${({ durations }) => durations["md"]}
        ${({ easings }) => easings["ease-out-power-1"]},
      opacity ${({ durations }) => durations["md"]} ${({ easings }) => easings["ease-out-power-1"]};
    will-change: background-color, opacity;
  }

  .account-links wui-flex:hover {
    background: var(--dark-accent-glass-015, rgba(71, 161, 255, 0.15));
  }

  .account-links wui-flex wui-icon {
    width: var(--S, 20px);
    height: var(--S, 20px);
  }

  .account-links wui-flex wui-icon svg path {
    stroke: #667dff;
  }
`;
var __decorate$1B = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mAccountDefaultWidget = class W3mAccountDefaultWidget2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.caipAddress = ChainController.getAccountData()?.caipAddress;
    this.address = CoreHelperUtil.getPlainAddress(ChainController.getAccountData()?.caipAddress);
    this.profileImage = ChainController.getAccountData()?.profileImage;
    this.profileName = ChainController.getAccountData()?.profileName;
    this.disconnecting = false;
    this.balance = ChainController.getAccountData()?.balance;
    this.balanceSymbol = ChainController.getAccountData()?.balanceSymbol;
    this.features = OptionsController.state.features;
    this.remoteFeatures = OptionsController.state.remoteFeatures;
    this.namespace = ChainController.state.activeChain;
    this.activeConnectorIds = ConnectorController.state.activeConnectorIds;
    this.unsubscribe.push(...[
      ChainController.subscribeChainProp("accountState", (val) => {
        this.address = CoreHelperUtil.getPlainAddress(val?.caipAddress);
        this.caipAddress = val?.caipAddress;
        this.balance = val?.balance;
        this.balanceSymbol = val?.balanceSymbol;
        this.profileName = val?.profileName;
        this.profileImage = val?.profileImage;
      }),
      OptionsController.subscribeKey("features", (val) => this.features = val),
      OptionsController.subscribeKey("remoteFeatures", (val) => this.remoteFeatures = val),
      ConnectorController.subscribeKey("activeConnectorIds", (newActiveConnectorIds) => {
        this.activeConnectorIds = newActiveConnectorIds;
      }),
      ChainController.subscribeKey("activeChain", (val) => this.namespace = val),
      ChainController.subscribeKey("activeCaipNetwork", (val) => {
        if (val?.chainNamespace) {
          this.namespace = val?.chainNamespace;
        }
      })
    ]);
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    if (!this.caipAddress || !this.namespace) {
      return null;
    }
    const connectorId = this.activeConnectorIds[this.namespace];
    const connector = connectorId ? ConnectorController.getConnectorById(connectorId) : void 0;
    const connectorImage = AssetUtil.getConnectorImage(connector);
    const { value, decimals, symbol } = CoreHelperUtil.parseBalance(this.balance, this.balanceSymbol);
    return T`<wui-flex
        flexDirection="column"
        .padding=${["0", "5", "4", "5"]}
        alignItems="center"
        gap="3"
      >
        <wui-avatar
          alt=${o(this.caipAddress)}
          address=${o(CoreHelperUtil.getPlainAddress(this.caipAddress))}
          imageSrc=${o(this.profileImage === null ? void 0 : this.profileImage)}
          data-testid="single-account-avatar"
        ></wui-avatar>
        <wui-wallet-switch
          profileName=${this.profileName}
          address=${this.address}
          imageSrc=${connectorImage}
          alt=${connector?.name}
          @click=${this.onGoToProfileWalletsView.bind(this)}
          data-testid="wui-wallet-switch"
        ></wui-wallet-switch>
        <div class="balance-container">
          <wui-text variant="h3-regular" color="primary">${value}</wui-text>
          <wui-text variant="h3-regular" color="secondary">.${decimals}</wui-text>
          <wui-text variant="h6-medium" color="primary" class="symbol">${symbol}</wui-text>
        </div>
        ${this.explorerBtnTemplate()}
      </wui-flex>

      <wui-flex flexDirection="column" gap="2" .padding=${["0", "3", "3", "3"]}>
        ${this.authCardTemplate()} <w3m-account-auth-button></w3m-account-auth-button>
        ${this.orderedFeaturesTemplate()} ${this.activityTemplate()}
        <wui-list-item
          .rounded=${true}
          icon="power"
          iconColor="error"
          ?chevron=${false}
          .loading=${this.disconnecting}
          .rightIcon=${false}
          @click=${this.onDisconnect.bind(this)}
          data-testid="disconnect-button"
        >
          <wui-text variant="lg-regular" color="primary">Disconnect</wui-text>
        </wui-list-item>
      </wui-flex>`;
  }
  fundWalletTemplate() {
    if (!this.namespace) {
      return null;
    }
    const isOnrampSupported = ConstantsUtil$2.ONRAMP_SUPPORTED_CHAIN_NAMESPACES.includes(this.namespace);
    const isReceiveEnabled = Boolean(this.features?.receive);
    const isOnrampEnabled = this.remoteFeatures?.onramp && isOnrampSupported;
    const isPayWithExchangeEnabled = ExchangeController.isPayWithExchangeEnabled();
    if (!isOnrampEnabled && !isReceiveEnabled && !isPayWithExchangeEnabled) {
      return null;
    }
    return T`
      <wui-list-item
        .rounded=${true}
        data-testid="w3m-account-default-fund-wallet-button"
        iconVariant="blue"
        icon="dollar"
        ?chevron=${true}
        @click=${this.handleClickFundWallet.bind(this)}
      >
        <wui-text variant="lg-regular" color="primary">Fund wallet</wui-text>
      </wui-list-item>
    `;
  }
  orderedFeaturesTemplate() {
    const featuresOrder = this.features?.walletFeaturesOrder || ConstantsUtil$2.DEFAULT_FEATURES.walletFeaturesOrder;
    return featuresOrder.map((feature) => {
      switch (feature) {
        case "onramp":
          return this.fundWalletTemplate();
        case "swaps":
          return this.swapsTemplate();
        case "send":
          return this.sendTemplate();
        default:
          return null;
      }
    });
  }
  activityTemplate() {
    if (!this.namespace) {
      return null;
    }
    const isEnabled = this.remoteFeatures?.activity && ConstantsUtil$2.ACTIVITY_ENABLED_CHAIN_NAMESPACES.includes(this.namespace);
    return isEnabled ? T` <wui-list-item
          .rounded=${true}
          icon="clock"
          ?chevron=${true}
          @click=${this.onTransactions.bind(this)}
          data-testid="w3m-account-default-activity-button"
        >
          <wui-text variant="lg-regular" color="primary">Activity</wui-text>
        </wui-list-item>` : null;
  }
  swapsTemplate() {
    const isSwapsEnabled = this.remoteFeatures?.swaps;
    const isEvm = ChainController.state.activeChain === ConstantsUtil$1.CHAIN.EVM;
    if (!isSwapsEnabled || !isEvm) {
      return null;
    }
    return T`
      <wui-list-item
        .rounded=${true}
        icon="recycleHorizontal"
        ?chevron=${true}
        @click=${this.handleClickSwap.bind(this)}
        data-testid="w3m-account-default-swaps-button"
      >
        <wui-text variant="lg-regular" color="primary">Swap</wui-text>
      </wui-list-item>
    `;
  }
  sendTemplate() {
    const isSendEnabled = this.features?.send;
    const namespace = ChainController.state.activeChain;
    if (!namespace) {
      throw new Error("SendController:sendTemplate - namespace is required");
    }
    const isSendSupported = ConstantsUtil$2.SEND_SUPPORTED_NAMESPACES.includes(namespace);
    if (!isSendEnabled || !isSendSupported) {
      return null;
    }
    return T`
      <wui-list-item
        .rounded=${true}
        icon="send"
        ?chevron=${true}
        @click=${this.handleClickSend.bind(this)}
        data-testid="w3m-account-default-send-button"
      >
        <wui-text variant="lg-regular" color="primary">Send</wui-text>
      </wui-list-item>
    `;
  }
  authCardTemplate() {
    const namespace = ChainController.state.activeChain;
    if (!namespace) {
      throw new Error("AuthCardTemplate:authCardTemplate - namespace is required");
    }
    const connectorId = ConnectorController.getConnectorId(namespace);
    const authConnector = ConnectorController.getAuthConnector();
    const { origin } = location;
    if (!authConnector || connectorId !== ConstantsUtil$1.CONNECTOR_ID.AUTH || origin.includes(ConstantsUtil$2.SECURE_SITE)) {
      return null;
    }
    return T`
      <wui-notice-card
        @click=${this.onGoToUpgradeView.bind(this)}
        label="Upgrade your wallet"
        description="Transition to a self-custodial wallet"
        icon="wallet"
        data-testid="w3m-wallet-upgrade-card"
      ></wui-notice-card>
    `;
  }
  handleClickFundWallet() {
    RouterController.push("FundWallet");
  }
  handleClickSwap() {
    RouterController.push("Swap");
  }
  handleClickSend() {
    RouterController.push("WalletSend");
  }
  explorerBtnTemplate() {
    const addressExplorerUrl = ChainController.getAccountData()?.addressExplorerUrl;
    if (!addressExplorerUrl) {
      return null;
    }
    return T`
      <wui-button size="md" variant="accent-primary" @click=${this.onExplorer.bind(this)}>
        <wui-icon size="sm" color="inherit" slot="iconLeft" name="compass"></wui-icon>
        Block Explorer
        <wui-icon size="sm" color="inherit" slot="iconRight" name="externalLink"></wui-icon>
      </wui-button>
    `;
  }
  onTransactions() {
    EventsController.sendEvent({
      type: "track",
      event: "CLICK_TRANSACTIONS",
      properties: {
        isSmartAccount: getPreferredAccountType(ChainController.state.activeChain) === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT
      }
    });
    RouterController.push("Transactions");
  }
  async onDisconnect() {
    try {
      this.disconnecting = true;
      const connectionsByNamespace = ConnectionController.getConnections(this.namespace);
      const hasConnections = connectionsByNamespace.length > 0;
      const connectorId = this.namespace && ConnectorController.state.activeConnectorIds[this.namespace];
      const isMultiWalletEnabled = this.remoteFeatures?.multiWallet;
      await ConnectionController.disconnect(isMultiWalletEnabled ? { id: connectorId, namespace: this.namespace } : {});
      if (hasConnections && isMultiWalletEnabled) {
        RouterController.push("ProfileWallets");
        SnackController.showSuccess("Wallet deleted");
      }
    } catch {
      EventsController.sendEvent({
        type: "track",
        event: "DISCONNECT_ERROR",
        properties: { message: "Failed to disconnect" }
      });
      SnackController.showError("Failed to disconnect");
    } finally {
      this.disconnecting = false;
    }
  }
  onExplorer() {
    const addressExplorerUrl = ChainController.getAccountData()?.addressExplorerUrl;
    if (addressExplorerUrl) {
      CoreHelperUtil.openHref(addressExplorerUrl, "_blank");
    }
  }
  onGoToUpgradeView() {
    EventsController.sendEvent({ type: "track", event: "EMAIL_UPGRADE_FROM_MODAL" });
    RouterController.push("UpgradeEmailWallet");
  }
  onGoToProfileWalletsView() {
    RouterController.push("ProfileWallets");
  }
};
W3mAccountDefaultWidget.styles = styles$18;
__decorate$1B([
  r()
], W3mAccountDefaultWidget.prototype, "caipAddress", void 0);
__decorate$1B([
  r()
], W3mAccountDefaultWidget.prototype, "address", void 0);
__decorate$1B([
  r()
], W3mAccountDefaultWidget.prototype, "profileImage", void 0);
__decorate$1B([
  r()
], W3mAccountDefaultWidget.prototype, "profileName", void 0);
__decorate$1B([
  r()
], W3mAccountDefaultWidget.prototype, "disconnecting", void 0);
__decorate$1B([
  r()
], W3mAccountDefaultWidget.prototype, "balance", void 0);
__decorate$1B([
  r()
], W3mAccountDefaultWidget.prototype, "balanceSymbol", void 0);
__decorate$1B([
  r()
], W3mAccountDefaultWidget.prototype, "features", void 0);
__decorate$1B([
  r()
], W3mAccountDefaultWidget.prototype, "remoteFeatures", void 0);
__decorate$1B([
  r()
], W3mAccountDefaultWidget.prototype, "namespace", void 0);
__decorate$1B([
  r()
], W3mAccountDefaultWidget.prototype, "activeConnectorIds", void 0);
W3mAccountDefaultWidget = __decorate$1B([
  customElement("w3m-account-default-widget")
], W3mAccountDefaultWidget);
const styles$17 = css`
  :host {
    min-height: 100%;
  }

  .group-container[last-group='true'] {
    padding-bottom: ${({ spacing }) => spacing["3"]};
  }

  .contentContainer {
    height: 280px;
  }

  .contentContainer > wui-icon-box {
    width: 40px;
    height: 40px;
    border-radius: ${({ borderRadius }) => borderRadius["3"]};
  }

  .contentContainer > .textContent {
    width: 65%;
  }

  .emptyContainer {
    height: 100%;
  }
`;
var __decorate$1A = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
const PAGINATOR_ID$1 = "last-transaction";
const LOADING_ITEM_COUNT = 7;
let W3mActivityList = class W3mActivityList2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.paginationObserver = void 0;
    this.page = "activity";
    this.caipAddress = ChainController.state.activeCaipAddress;
    this.transactionsByYear = TransactionsController.state.transactionsByYear;
    this.loading = TransactionsController.state.loading;
    this.empty = TransactionsController.state.empty;
    this.next = TransactionsController.state.next;
    TransactionsController.clearCursor();
    this.unsubscribe.push(...[
      ChainController.subscribeKey("activeCaipAddress", (val) => {
        if (val) {
          if (this.caipAddress !== val) {
            TransactionsController.resetTransactions();
            TransactionsController.fetchTransactions(val);
          }
        }
        this.caipAddress = val;
      }),
      ChainController.subscribeKey("activeCaipNetwork", () => {
        this.updateTransactionView();
      }),
      TransactionsController.subscribe((val) => {
        this.transactionsByYear = val.transactionsByYear;
        this.loading = val.loading;
        this.empty = val.empty;
        this.next = val.next;
      })
    ]);
  }
  firstUpdated() {
    this.updateTransactionView();
    this.createPaginationObserver();
  }
  updated() {
    this.setPaginationObserver();
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    return T` ${this.empty ? null : this.templateTransactionsByYear()}
    ${this.loading ? this.templateLoading() : null}
    ${!this.loading && this.empty ? this.templateEmpty() : null}`;
  }
  updateTransactionView() {
    TransactionsController.resetTransactions();
    if (this.caipAddress) {
      TransactionsController.fetchTransactions(CoreHelperUtil.getPlainAddress(this.caipAddress));
    }
  }
  templateTransactionsByYear() {
    const sortedYearKeys = Object.keys(this.transactionsByYear).sort().reverse();
    return sortedYearKeys.map((year) => {
      const yearInt = parseInt(year, 10);
      const sortedMonthIndexes = new Array(12).fill(null).map((_, idx) => {
        const groupTitle = TransactionUtil.getTransactionGroupTitle(yearInt, idx);
        const transactions2 = this.transactionsByYear[yearInt]?.[idx];
        return {
          groupTitle,
          transactions: transactions2
        };
      }).filter(({ transactions: transactions2 }) => transactions2).reverse();
      return sortedMonthIndexes.map(({ groupTitle, transactions: transactions2 }, index2) => {
        const isLastGroup = index2 === sortedMonthIndexes.length - 1;
        if (!transactions2) {
          return null;
        }
        return T`
          <wui-flex
            flexDirection="column"
            class="group-container"
            last-group="${isLastGroup ? "true" : "false"}"
            data-testid="month-indexes"
          >
            <wui-flex
              alignItems="center"
              flexDirection="row"
              .padding=${["2", "3", "3", "3"]}
            >
              <wui-text variant="md-medium" color="secondary" data-testid="group-title">
                ${groupTitle}
              </wui-text>
            </wui-flex>
            <wui-flex flexDirection="column" gap="2">
              ${this.templateTransactions(transactions2, isLastGroup)}
            </wui-flex>
          </wui-flex>
        `;
      });
    });
  }
  templateRenderTransaction(transaction, isLastTransaction) {
    const { date, descriptions, direction, images, status, type, transfers, isAllNFT } = this.getTransactionListItemProps(transaction);
    return T`
      <wui-transaction-list-item
        date=${date}
        .direction=${direction}
        id=${isLastTransaction && this.next ? PAGINATOR_ID$1 : ""}
        status=${status}
        type=${type}
        .images=${images}
        .onlyDirectionIcon=${isAllNFT || transfers.length === 1}
        .descriptions=${descriptions}
      ></wui-transaction-list-item>
    `;
  }
  templateTransactions(transactions2, isLastGroup) {
    return transactions2.map((transaction, index2) => {
      const isLastTransaction = isLastGroup && index2 === transactions2.length - 1;
      return T`${this.templateRenderTransaction(transaction, isLastTransaction)}`;
    });
  }
  emptyStateActivity() {
    return T`<wui-flex
      class="emptyContainer"
      flexGrow="1"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      .padding=${["10", "5", "10", "5"]}
      gap="5"
      data-testid="empty-activity-state"
    >
      <wui-icon-box color="default" icon="wallet" size="xl"></wui-icon-box>
      <wui-flex flexDirection="column" alignItems="center" gap="2">
        <wui-text align="center" variant="lg-medium" color="primary">No Transactions yet</wui-text>
        <wui-text align="center" variant="lg-regular" color="secondary"
          >Start trading on dApps <br />
          to grow your wallet!</wui-text
        >
      </wui-flex>
    </wui-flex>`;
  }
  emptyStateAccount() {
    return T`<wui-flex
      class="contentContainer"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      gap="4"
      data-testid="empty-account-state"
    >
      <wui-icon-box icon="swapHorizontal" size="lg" color="default"></wui-icon-box>
      <wui-flex
        class="textContent"
        gap="2"
        flexDirection="column"
        justifyContent="center"
        flexDirection="column"
      >
        <wui-text variant="md-regular" align="center" color="primary">No activity yet</wui-text>
        <wui-text variant="sm-regular" align="center" color="secondary"
          >Your next transactions will appear here</wui-text
        >
      </wui-flex>
      <wui-link @click=${this.onReceiveClick.bind(this)}>Trade</wui-link>
    </wui-flex>`;
  }
  templateEmpty() {
    if (this.page === "account") {
      return T`${this.emptyStateAccount()}`;
    }
    return T`${this.emptyStateActivity()}`;
  }
  templateLoading() {
    if (this.page === "activity") {
      return T` <wui-flex flexDirection="column" width="100%">
        <wui-flex .padding=${["2", "3", "3", "3"]}>
          <wui-shimmer width="70px" height="16px" rounded></wui-shimmer>
        </wui-flex>
        <wui-flex flexDirection="column" gap="2" width="100%">
          ${Array(LOADING_ITEM_COUNT).fill(T` <wui-transaction-list-item-loader></wui-transaction-list-item-loader> `).map((item) => item)}
        </wui-flex>
      </wui-flex>`;
    }
    return null;
  }
  onReceiveClick() {
    RouterController.push("WalletReceive");
  }
  createPaginationObserver() {
    const { projectId } = OptionsController.state;
    this.paginationObserver = new IntersectionObserver(([element]) => {
      if (element?.isIntersecting && !this.loading) {
        TransactionsController.fetchTransactions(CoreHelperUtil.getPlainAddress(this.caipAddress));
        EventsController.sendEvent({
          type: "track",
          event: "LOAD_MORE_TRANSACTIONS",
          properties: {
            address: CoreHelperUtil.getPlainAddress(this.caipAddress),
            projectId,
            cursor: this.next,
            isSmartAccount: getPreferredAccountType(ChainController.state.activeChain) === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT
          }
        });
      }
    }, {});
    this.setPaginationObserver();
  }
  setPaginationObserver() {
    this.paginationObserver?.disconnect();
    const lastItem = this.shadowRoot?.querySelector(`#${PAGINATOR_ID$1}`);
    if (lastItem) {
      this.paginationObserver?.observe(lastItem);
    }
  }
  getTransactionListItemProps(transaction) {
    const date = DateUtil.formatDate(transaction?.metadata?.minedAt);
    const transfers = TransactionUtil.mergeTransfers(transaction?.transfers || []);
    const descriptions = TransactionUtil.getTransactionDescriptions(transaction, transfers);
    const transfer = transfers?.[0];
    const isAllNFT = Boolean(transfer) && transfers?.every((item) => Boolean(item.nft_info));
    const images = TransactionUtil.getTransactionImages(transfers);
    return {
      date,
      direction: transfer?.direction,
      descriptions,
      isAllNFT,
      images,
      status: transaction.metadata?.status,
      transfers,
      type: transaction.metadata?.operationType
    };
  }
};
W3mActivityList.styles = styles$17;
__decorate$1A([
  n()
], W3mActivityList.prototype, "page", void 0);
__decorate$1A([
  r()
], W3mActivityList.prototype, "caipAddress", void 0);
__decorate$1A([
  r()
], W3mActivityList.prototype, "transactionsByYear", void 0);
__decorate$1A([
  r()
], W3mActivityList.prototype, "loading", void 0);
__decorate$1A([
  r()
], W3mActivityList.prototype, "empty", void 0);
__decorate$1A([
  r()
], W3mActivityList.prototype, "next", void 0);
W3mActivityList = __decorate$1A([
  customElement("w3m-activity-list")
], W3mActivityList);
const styles$16 = i$1`
  :host {
    width: 100%;
    max-height: 280px;
    overflow: scroll;
    scrollbar-width: none;
  }

  :host::-webkit-scrollbar {
    display: none;
  }
`;
var __decorate$1z = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mAccountActivityWidget = class W3mAccountActivityWidget2 extends i {
  render() {
    return T`<w3m-activity-list page="account"></w3m-activity-list>`;
  }
};
W3mAccountActivityWidget.styles = styles$16;
W3mAccountActivityWidget = __decorate$1z([
  customElement("w3m-account-activity-widget")
], W3mAccountActivityWidget);
const styles$15 = i$1`
  :host {
    width: 100%;
  }

  wui-flex {
    width: 100%;
  }

  .contentContainer {
    max-height: 280px;
    overflow: scroll;
    scrollbar-width: none;
  }

  .contentContainer::-webkit-scrollbar {
    display: none;
  }
`;
var __decorate$1y = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mAccountTokensWidget = class W3mAccountTokensWidget2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.tokenBalance = ChainController.getAccountData()?.tokenBalance;
    this.remoteFeatures = OptionsController.state.remoteFeatures;
    this.unsubscribe.push(...[
      ChainController.subscribeChainProp("accountState", (val) => {
        this.tokenBalance = val?.tokenBalance;
      }),
      OptionsController.subscribeKey("remoteFeatures", (val) => {
        this.remoteFeatures = val;
      })
    ]);
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    return T`${this.tokenTemplate()}`;
  }
  tokenTemplate() {
    if (this.tokenBalance && this.tokenBalance?.length > 0) {
      return T`<wui-flex class="contentContainer" flexDirection="column" gap="2">
        ${this.tokenItemTemplate()}
      </wui-flex>`;
    }
    return T` <wui-flex flexDirection="column">
      ${this.onRampTemplate()}
      <wui-list-description
        @click=${this.onReceiveClick.bind(this)}
        text="Receive funds"
        description="Scan the QR code and receive funds"
        icon="qrCode"
        iconColor="fg-200"
        iconBackgroundColor="fg-200"
        data-testid="w3m-account-receive-button"
      ></wui-list-description
    ></wui-flex>`;
  }
  onRampTemplate() {
    if (this.remoteFeatures?.onramp) {
      return T`<wui-list-description
        @click=${this.onBuyClick.bind(this)}
        text="Buy Crypto"
        description="Easy with card or bank account"
        icon="card"
        iconColor="success-100"
        iconBackgroundColor="success-100"
        tag="popular"
        data-testid="w3m-account-onramp-button"
      ></wui-list-description>`;
    }
    return T``;
  }
  tokenItemTemplate() {
    return this.tokenBalance?.map((token) => T`<wui-list-token
          tokenName=${token.name}
          tokenImageUrl=${token.iconUrl}
          tokenAmount=${token.quantity.numeric}
          tokenValue=${token.value}
          tokenCurrency=${token.symbol}
        ></wui-list-token>`);
  }
  onReceiveClick() {
    RouterController.push("WalletReceive");
  }
  onBuyClick() {
    EventsController.sendEvent({
      type: "track",
      event: "SELECT_BUY_CRYPTO",
      properties: {
        isSmartAccount: getPreferredAccountType(ChainController.state.activeChain) === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT
      }
    });
    RouterController.push("OnRampProviders");
  }
};
W3mAccountTokensWidget.styles = styles$15;
__decorate$1y([
  r()
], W3mAccountTokensWidget.prototype, "tokenBalance", void 0);
__decorate$1y([
  r()
], W3mAccountTokensWidget.prototype, "remoteFeatures", void 0);
W3mAccountTokensWidget = __decorate$1y([
  customElement("w3m-account-tokens-widget")
], W3mAccountTokensWidget);
const styles$14 = i$1`
  :host {
    width: 100%;
    display: block;
  }
`;
var __decorate$1x = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let WuiTooltipTrigger = class WuiTooltipTrigger2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.text = "";
    this.open = TooltipController.state.open;
    this.unsubscribe.push(RouterController.subscribeKey("view", () => {
      TooltipController.hide();
    }), ModalController.subscribeKey("open", (modalOpen) => {
      if (!modalOpen) {
        TooltipController.hide();
      }
    }), TooltipController.subscribeKey("open", (tooltipOpen) => {
      this.open = tooltipOpen;
    }));
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
    TooltipController.hide();
  }
  render() {
    return T`
      <div
        @pointermove=${this.onMouseEnter.bind(this)}
        @pointerleave=${this.onMouseLeave.bind(this)}
      >
        ${this.renderChildren()}
      </div>
    `;
  }
  renderChildren() {
    return T`<slot></slot> `;
  }
  onMouseEnter() {
    const rect = this.getBoundingClientRect();
    if (!this.open) {
      const modalContainer = document.querySelector("w3m-modal");
      const triggerRect = {
        width: rect.width,
        height: rect.height,
        left: rect.left,
        top: rect.top
      };
      if (modalContainer) {
        const containerRect = modalContainer.getBoundingClientRect();
        triggerRect.left = rect.left - (window.innerWidth - containerRect.width) / 2;
        triggerRect.top = rect.top - (window.innerHeight - containerRect.height) / 2;
      }
      TooltipController.showTooltip({
        message: this.text,
        triggerRect,
        variant: "shade"
      });
    }
  }
  onMouseLeave(event) {
    if (!this.contains(event.relatedTarget)) {
      TooltipController.hide();
    }
  }
};
WuiTooltipTrigger.styles = [styles$14];
__decorate$1x([
  n()
], WuiTooltipTrigger.prototype, "text", void 0);
__decorate$1x([
  r()
], WuiTooltipTrigger.prototype, "open", void 0);
WuiTooltipTrigger = __decorate$1x([
  customElement("w3m-tooltip-trigger")
], WuiTooltipTrigger);
const styles$13 = css`
  :host {
    pointer-events: none;
  }

  :host > wui-flex {
    display: var(--w3m-tooltip-display);
    opacity: var(--w3m-tooltip-opacity);
    padding: 9px ${({ spacing }) => spacing["3"]} 10px ${({ spacing }) => spacing["3"]};
    border-radius: ${({ borderRadius }) => borderRadius["3"]};
    color: ${({ tokens }) => tokens.theme.backgroundPrimary};
    position: absolute;
    top: var(--w3m-tooltip-top);
    left: var(--w3m-tooltip-left);
    transform: translate(calc(-50% + var(--w3m-tooltip-parent-width)), calc(-100% - 8px));
    max-width: calc(var(--apkt-modal-width) - ${({ spacing }) => spacing["5"]});
    transition: opacity ${({ durations }) => durations["lg"]}
      ${({ easings }) => easings["ease-out-power-2"]};
    will-change: opacity;
    opacity: 0;
    animation-duration: ${({ durations }) => durations["xl"]};
    animation-timing-function: ${({ easings }) => easings["ease-out-power-2"]};
    animation-name: fade-in;
    animation-fill-mode: forwards;
  }

  :host([data-variant='shade']) > wui-flex {
    background-color: ${({ tokens }) => tokens.theme.foregroundPrimary};
  }

  :host([data-variant='shade']) > wui-flex > wui-text {
    color: ${({ tokens }) => tokens.theme.textSecondary};
  }

  :host([data-variant='fill']) > wui-flex {
    background-color: ${({ tokens }) => tokens.theme.backgroundPrimary};
    border: 1px solid ${({ tokens }) => tokens.theme.borderPrimary};
  }

  wui-icon {
    position: absolute;
    width: 12px !important;
    height: 4px !important;
    color: ${({ tokens }) => tokens.theme.foregroundPrimary};
  }

  wui-icon[data-placement='top'] {
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, 95%);
  }

  wui-icon[data-placement='bottom'] {
    top: 0;
    left: 50%;
    transform: translate(-50%, -95%) rotate(180deg);
  }

  wui-icon[data-placement='right'] {
    top: 50%;
    left: 0;
    transform: translate(-65%, -50%) rotate(90deg);
  }

  wui-icon[data-placement='left'] {
    top: 50%;
    right: 0%;
    transform: translate(65%, -50%) rotate(270deg);
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
var __decorate$1w = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mTooltip = class W3mTooltip2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.open = TooltipController.state.open;
    this.message = TooltipController.state.message;
    this.triggerRect = TooltipController.state.triggerRect;
    this.variant = TooltipController.state.variant;
    this.unsubscribe.push(...[
      TooltipController.subscribe((newState) => {
        this.open = newState.open;
        this.message = newState.message;
        this.triggerRect = newState.triggerRect;
        this.variant = newState.variant;
      })
    ]);
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    this.dataset["variant"] = this.variant;
    const topValue = this.triggerRect.top;
    const leftValue = this.triggerRect.left;
    this.style.cssText = `
    --w3m-tooltip-top: ${topValue}px;
    --w3m-tooltip-left: ${leftValue}px;
    --w3m-tooltip-parent-width: ${this.triggerRect.width / 2}px;
    --w3m-tooltip-display: ${this.open ? "flex" : "none"};
    --w3m-tooltip-opacity: ${this.open ? 1 : 0};
    `;
    return T`<wui-flex>
      <wui-icon data-placement="top" size="inherit" name="cursor"></wui-icon>
      <wui-text color="primary" variant="sm-regular">${this.message}</wui-text>
    </wui-flex>`;
  }
};
W3mTooltip.styles = [styles$13];
__decorate$1w([
  r()
], W3mTooltip.prototype, "open", void 0);
__decorate$1w([
  r()
], W3mTooltip.prototype, "message", void 0);
__decorate$1w([
  r()
], W3mTooltip.prototype, "triggerRect", void 0);
__decorate$1w([
  r()
], W3mTooltip.prototype, "variant", void 0);
W3mTooltip = __decorate$1w([
  customElement("w3m-tooltip")
], W3mTooltip);
const styles$12 = css`
  wui-flex {
    width: 100%;
  }

  wui-promo {
    position: absolute;
    top: -32px;
  }

  wui-profile-button {
    margin-top: calc(-1 * ${({ spacing }) => spacing["4"]});
  }

  wui-promo + wui-profile-button {
    margin-top: ${({ spacing }) => spacing["4"]};
  }

  wui-tabs {
    width: 100%;
  }

  .contentContainer {
    height: 280px;
  }

  .contentContainer > wui-icon-box {
    width: 40px;
    height: 40px;
    border-radius: ${({ borderRadius }) => borderRadius["3"]};
  }

  .contentContainer > .textContent {
    width: 65%;
  }
`;
var __decorate$1v = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mAccountWalletFeaturesWidget = class W3mAccountWalletFeaturesWidget2 extends i {
  constructor() {
    super(...arguments);
    this.unsubscribe = [];
    this.network = ChainController.state.activeCaipNetwork;
    this.profileName = ChainController.getAccountData()?.profileName;
    this.address = ChainController.getAccountData()?.address;
    this.currentTab = ChainController.getAccountData()?.currentTab;
    this.tokenBalance = ChainController.getAccountData()?.tokenBalance;
    this.features = OptionsController.state.features;
    this.namespace = ChainController.state.activeChain;
    this.activeConnectorIds = ConnectorController.state.activeConnectorIds;
    this.remoteFeatures = OptionsController.state.remoteFeatures;
  }
  firstUpdated() {
    ChainController.fetchTokenBalance();
    this.unsubscribe.push(...[
      ChainController.subscribeChainProp("accountState", (val) => {
        if (val?.address) {
          this.address = val.address;
          this.profileName = val.profileName;
          this.currentTab = val.currentTab;
          this.tokenBalance = val.tokenBalance;
        } else {
          ModalController.close();
        }
      })
    ], ConnectorController.subscribeKey("activeConnectorIds", (newActiveConnectorIds) => {
      this.activeConnectorIds = newActiveConnectorIds;
    }), ChainController.subscribeKey("activeChain", (val) => this.namespace = val), ChainController.subscribeKey("activeCaipNetwork", (val) => this.network = val), OptionsController.subscribeKey("features", (val) => this.features = val), OptionsController.subscribeKey("remoteFeatures", (val) => this.remoteFeatures = val));
    this.watchSwapValues();
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
    clearInterval(this.watchTokenBalance);
  }
  render() {
    if (!this.address) {
      throw new Error("w3m-account-features-widget: No account provided");
    }
    if (!this.namespace) {
      return null;
    }
    const connectorId = this.activeConnectorIds[this.namespace];
    const connector = connectorId ? ConnectorController.getConnectorById(connectorId) : void 0;
    const { icon, iconSize } = this.getAuthData();
    return T`<wui-flex
      flexDirection="column"
      .padding=${["0", "3", "4", "3"]}
      alignItems="center"
      gap="4"
      data-testid="w3m-account-wallet-features-widget"
    >
      <wui-flex flexDirection="column" justifyContent="center" alignItems="center" gap="2">
        <wui-wallet-switch
          profileName=${this.profileName}
          address=${this.address}
          icon=${icon}
          iconSize=${iconSize}
          alt=${connector?.name}
          @click=${this.onGoToProfileWalletsView.bind(this)}
          data-testid="wui-wallet-switch"
        ></wui-wallet-switch>

        ${this.tokenBalanceTemplate()}
      </wui-flex>
      ${this.orderedWalletFeatures()} ${this.tabsTemplate()} ${this.listContentTemplate()}
    </wui-flex>`;
  }
  orderedWalletFeatures() {
    const walletFeaturesOrder = this.features?.walletFeaturesOrder || ConstantsUtil$2.DEFAULT_FEATURES.walletFeaturesOrder;
    const isAllDisabled = walletFeaturesOrder.every((feature) => {
      if (feature === "send" || feature === "receive") {
        return !this.features?.[feature];
      }
      if (feature === "swaps" || feature === "onramp") {
        return !this.remoteFeatures?.[feature];
      }
      return true;
    });
    if (isAllDisabled) {
      return null;
    }
    const mergedFeaturesOrder = walletFeaturesOrder.map((feature) => {
      if (feature === "receive" || feature === "onramp") {
        return "fund";
      }
      return feature;
    });
    const deduplicatedFeaturesOrder = [...new Set(mergedFeaturesOrder)];
    return T`<wui-flex gap="2">
      ${deduplicatedFeaturesOrder.map((feature) => {
      switch (feature) {
        case "fund":
          return this.fundWalletTemplate();
        case "swaps":
          return this.swapsTemplate();
        case "send":
          return this.sendTemplate();
        default:
          return null;
      }
    })}
    </wui-flex>`;
  }
  fundWalletTemplate() {
    if (!this.namespace) {
      return null;
    }
    const isOnrampSupported = ConstantsUtil$2.ONRAMP_SUPPORTED_CHAIN_NAMESPACES.includes(this.namespace);
    const isReceiveEnabled = this.features?.receive;
    const isOnrampEnabled = this.remoteFeatures?.onramp && isOnrampSupported;
    const isPayWithExchangeEnabled = ExchangeController.isPayWithExchangeEnabled();
    if (!isOnrampEnabled && !isReceiveEnabled && !isPayWithExchangeEnabled) {
      return null;
    }
    return T`
      <w3m-tooltip-trigger text="Fund wallet">
        <wui-button
          data-testid="wallet-features-fund-wallet-button"
          @click=${this.onFundWalletClick.bind(this)}
          variant="accent-secondary"
          size="lg"
          fullWidth
        >
          <wui-icon name="dollar"></wui-icon>
        </wui-button>
      </w3m-tooltip-trigger>
    `;
  }
  swapsTemplate() {
    const isSwapsEnabled = this.remoteFeatures?.swaps;
    const isEvm = ChainController.state.activeChain === ConstantsUtil$1.CHAIN.EVM;
    if (!isSwapsEnabled || !isEvm) {
      return null;
    }
    return T`
      <w3m-tooltip-trigger text="Swap">
        <wui-button
          fullWidth
          data-testid="wallet-features-swaps-button"
          @click=${this.onSwapClick.bind(this)}
          variant="accent-secondary"
          size="lg"
        >
          <wui-icon name="recycleHorizontal"></wui-icon>
        </wui-button>
      </w3m-tooltip-trigger>
    `;
  }
  sendTemplate() {
    const isSendEnabled = this.features?.send;
    const activeNamespace = ChainController.state.activeChain;
    const isSendSupported = ConstantsUtil$2.SEND_SUPPORTED_NAMESPACES.includes(activeNamespace);
    if (!isSendEnabled || !isSendSupported) {
      return null;
    }
    return T`
      <w3m-tooltip-trigger text="Send">
        <wui-button
          fullWidth
          data-testid="wallet-features-send-button"
          @click=${this.onSendClick.bind(this)}
          variant="accent-secondary"
          size="lg"
        >
          <wui-icon name="send"></wui-icon>
        </wui-button>
      </w3m-tooltip-trigger>
    `;
  }
  watchSwapValues() {
    this.watchTokenBalance = setInterval(() => ChainController.fetchTokenBalance((error) => this.onTokenBalanceError(error)), 1e4);
  }
  onTokenBalanceError(error) {
    if (error instanceof Error && error.cause instanceof Response) {
      const statusCode = error.cause.status;
      if (statusCode === ConstantsUtil$1.HTTP_STATUS_CODES.SERVICE_UNAVAILABLE) {
        clearInterval(this.watchTokenBalance);
      }
    }
  }
  listContentTemplate() {
    if (this.currentTab === 0) {
      return T`<w3m-account-tokens-widget></w3m-account-tokens-widget>`;
    }
    if (this.currentTab === 1) {
      return T`<w3m-account-activity-widget></w3m-account-activity-widget>`;
    }
    return T`<w3m-account-tokens-widget></w3m-account-tokens-widget>`;
  }
  tokenBalanceTemplate() {
    if (this.tokenBalance && this.tokenBalance?.length >= 0) {
      const value = CoreHelperUtil.calculateBalance(this.tokenBalance);
      const { dollars = "0", pennies = "00" } = CoreHelperUtil.formatTokenBalance(value);
      return T`<wui-balance dollars=${dollars} pennies=${pennies}></wui-balance>`;
    }
    return T`<wui-balance dollars="0" pennies="00"></wui-balance>`;
  }
  tabsTemplate() {
    const tabsByNamespace = HelpersUtil.getTabsByNamespace(ChainController.state.activeChain);
    if (tabsByNamespace.length === 0) {
      return null;
    }
    return T`<wui-tabs
      .onTabChange=${this.onTabChange.bind(this)}
      .activeTab=${this.currentTab}
      .tabs=${tabsByNamespace}
    ></wui-tabs>`;
  }
  onTabChange(index2) {
    ChainController.setAccountProp("currentTab", index2, this.namespace);
  }
  onFundWalletClick() {
    RouterController.push("FundWallet");
  }
  onSwapClick() {
    if (this.network?.caipNetworkId && !ConstantsUtil$2.SWAP_SUPPORTED_NETWORKS.includes(this.network?.caipNetworkId)) {
      RouterController.push("UnsupportedChain", {
        swapUnsupportedChain: true
      });
    } else {
      EventsController.sendEvent({
        type: "track",
        event: "OPEN_SWAP",
        properties: {
          network: this.network?.caipNetworkId || "",
          isSmartAccount: getPreferredAccountType(ChainController.state.activeChain) === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT
        }
      });
      RouterController.push("Swap");
    }
  }
  getAuthData() {
    const socialProvider = StorageUtil.getConnectedSocialProvider();
    const socialUsername = StorageUtil.getConnectedSocialUsername();
    const authConnector = ConnectorController.getAuthConnector();
    const email2 = authConnector?.provider.getEmail() ?? "";
    return {
      name: ConnectorUtil.getAuthName({
        email: email2,
        socialUsername,
        socialProvider
      }),
      icon: socialProvider ?? "mail",
      iconSize: socialProvider ? "xl" : "md"
    };
  }
  onGoToProfileWalletsView() {
    RouterController.push("ProfileWallets");
  }
  onSendClick() {
    EventsController.sendEvent({
      type: "track",
      event: "OPEN_SEND",
      properties: {
        network: this.network?.caipNetworkId || "",
        isSmartAccount: getPreferredAccountType(ChainController.state.activeChain) === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT
      }
    });
    RouterController.push("WalletSend");
  }
};
W3mAccountWalletFeaturesWidget.styles = styles$12;
__decorate$1v([
  r()
], W3mAccountWalletFeaturesWidget.prototype, "watchTokenBalance", void 0);
__decorate$1v([
  r()
], W3mAccountWalletFeaturesWidget.prototype, "network", void 0);
__decorate$1v([
  r()
], W3mAccountWalletFeaturesWidget.prototype, "profileName", void 0);
__decorate$1v([
  r()
], W3mAccountWalletFeaturesWidget.prototype, "address", void 0);
__decorate$1v([
  r()
], W3mAccountWalletFeaturesWidget.prototype, "currentTab", void 0);
__decorate$1v([
  r()
], W3mAccountWalletFeaturesWidget.prototype, "tokenBalance", void 0);
__decorate$1v([
  r()
], W3mAccountWalletFeaturesWidget.prototype, "features", void 0);
__decorate$1v([
  r()
], W3mAccountWalletFeaturesWidget.prototype, "namespace", void 0);
__decorate$1v([
  r()
], W3mAccountWalletFeaturesWidget.prototype, "activeConnectorIds", void 0);
__decorate$1v([
  r()
], W3mAccountWalletFeaturesWidget.prototype, "remoteFeatures", void 0);
W3mAccountWalletFeaturesWidget = __decorate$1v([
  customElement("w3m-account-wallet-features-widget")
], W3mAccountWalletFeaturesWidget);
var __decorate$1u = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mAccountView = class W3mAccountView2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.namespace = ChainController.state.activeChain;
    this.unsubscribe.push(ChainController.subscribeKey("activeChain", (namespace) => {
      this.namespace = namespace;
    }));
  }
  render() {
    if (!this.namespace) {
      return null;
    }
    const connectorId = ConnectorController.getConnectorId(this.namespace);
    const authConnector = ConnectorController.getAuthConnector();
    return T`
      ${authConnector && connectorId === ConstantsUtil$1.CONNECTOR_ID.AUTH ? this.walletFeaturesTemplate() : this.defaultTemplate()}
    `;
  }
  walletFeaturesTemplate() {
    return T`<w3m-account-wallet-features-widget></w3m-account-wallet-features-widget>`;
  }
  defaultTemplate() {
    return T`<w3m-account-default-widget></w3m-account-default-widget>`;
  }
};
__decorate$1u([
  r()
], W3mAccountView.prototype, "namespace", void 0);
W3mAccountView = __decorate$1u([
  customElement("w3m-account-view")
], W3mAccountView);
const ConnectionUtil = {
  getAuthData(connection) {
    const isAuth = connection.connectorId === ConstantsUtil$1.CONNECTOR_ID.AUTH;
    if (!isAuth) {
      return { isAuth: false, icon: void 0, iconSize: void 0, name: void 0 };
    }
    const socialProvider = connection?.auth?.name ?? StorageUtil.getConnectedSocialProvider();
    const socialUsername = connection?.auth?.username ?? StorageUtil.getConnectedSocialUsername();
    const authConnector = ConnectorController.getAuthConnector();
    const email2 = authConnector?.provider.getEmail() ?? "";
    return {
      isAuth: true,
      icon: socialProvider ?? "mail",
      iconSize: socialProvider ? "xl" : "md",
      name: isAuth ? ConnectorUtil.getAuthName({ email: email2, socialUsername, socialProvider }) : void 0
    };
  }
};
const styles$11 = css`
  :host {
    --connect-scroll--top-opacity: 0;
    --connect-scroll--bottom-opacity: 0;
  }

  .balance-amount {
    flex: 1;
  }

  .wallet-list {
    scrollbar-width: none;
    overflow-y: scroll;
    overflow-x: hidden;
    transition: opacity ${({ easings }) => easings["ease-out-power-1"]}
      ${({ durations }) => durations["md"]};
    will-change: opacity;
    mask-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, calc(1 - var(--connect-scroll--top-opacity))) 0px,
      rgba(200, 200, 200, calc(1 - var(--connect-scroll--top-opacity))) 1px,
      black 40px,
      black calc(100% - 40px),
      rgba(155, 155, 155, calc(1 - var(--connect-scroll--bottom-opacity))) calc(100% - 1px),
      rgba(0, 0, 0, calc(1 - var(--connect-scroll--bottom-opacity))) 100%
    );
  }

  .active-wallets {
    background-color: ${({ tokens }) => tokens.theme.foregroundPrimary};
    border-radius: ${({ borderRadius }) => borderRadius["4"]};
  }

  .active-wallets-box {
    height: 330px;
  }

  .empty-wallet-list-box {
    height: 400px;
  }

  .empty-box {
    width: 100%;
    padding: ${({ spacing }) => spacing["4"]};
    background-color: ${({ tokens }) => tokens.theme.foregroundPrimary};
    border-radius: ${({ borderRadius }) => borderRadius["4"]};
  }

  wui-separator {
    margin: ${({ spacing }) => spacing["2"]} 0 ${({ spacing }) => spacing["2"]} 0;
  }

  .active-connection {
    padding: ${({ spacing }) => spacing["2"]};
  }

  .recent-connection {
    padding: ${({ spacing }) => spacing["2"]} 0 ${({ spacing }) => spacing["2"]} 0;
  }

  @media (max-width: 430px) {
    .active-wallets-box,
    .empty-wallet-list-box {
      height: auto;
      max-height: clamp(360px, 470px, 80vh);
    }
  }
`;
var __decorate$1t = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
const UI_CONFIG = {
  ADDRESS_DISPLAY: { START: 4, END: 6 },
  BADGE: { SIZE: "md", ICON: "lightbulb" },
  SCROLL_THRESHOLD: 50,
  OPACITY_RANGE: [0, 1]
};
const NAMESPACE_ICONS = {
  eip155: "ethereum",
  solana: "solana",
  bip122: "bitcoin",
  ton: "ton",
  tron: "tron"
};
const NAMESPACE_TABS = [
  { namespace: "eip155", icon: NAMESPACE_ICONS.eip155, label: "EVM" },
  { namespace: "solana", icon: NAMESPACE_ICONS.solana, label: "Solana" },
  { namespace: "bip122", icon: NAMESPACE_ICONS.bip122, label: "Bitcoin" },
  { namespace: "ton", icon: NAMESPACE_ICONS.ton, label: "Ton" },
  { namespace: "tron", icon: NAMESPACE_ICONS.tron, label: "Tron" }
];
const CHAIN_LABELS = {
  eip155: { title: "Add EVM Wallet", description: "Add your first EVM wallet" },
  solana: { title: "Add Solana Wallet", description: "Add your first Solana wallet" },
  bip122: { title: "Add Bitcoin Wallet", description: "Add your first Bitcoin wallet" },
  ton: { title: "Add TON Wallet", description: "Add your first TON wallet" },
  tron: { title: "Add TRON Wallet", description: "Add your first TRON wallet" }
};
let W3mProfileWalletsView = class W3mProfileWalletsView2 extends i {
  constructor() {
    super();
    this.unsubscribers = [];
    this.currentTab = 0;
    this.namespace = ChainController.state.activeChain;
    this.namespaces = Array.from(ChainController.state.chains.keys());
    this.caipAddress = void 0;
    this.profileName = void 0;
    this.activeConnectorIds = ConnectorController.state.activeConnectorIds;
    this.lastSelectedAddress = "";
    this.lastSelectedConnectorId = "";
    this.isSwitching = false;
    this.caipNetwork = ChainController.state.activeCaipNetwork;
    this.user = ChainController.getAccountData()?.user;
    this.remoteFeatures = OptionsController.state.remoteFeatures;
    this.currentTab = this.namespace ? this.namespaces.indexOf(this.namespace) : 0;
    this.caipAddress = ChainController.getAccountData(this.namespace)?.caipAddress;
    this.profileName = ChainController.getAccountData(this.namespace)?.profileName;
    this.unsubscribers.push(...[
      ConnectionController.subscribeKey("connections", () => this.onConnectionsChange()),
      ConnectionController.subscribeKey("recentConnections", () => this.requestUpdate()),
      ConnectorController.subscribeKey("activeConnectorIds", (ids) => {
        this.activeConnectorIds = ids;
      }),
      ChainController.subscribeKey("activeCaipNetwork", (val) => this.caipNetwork = val),
      ChainController.subscribeChainProp("accountState", (val) => {
        this.user = val?.user;
      }),
      OptionsController.subscribeKey("remoteFeatures", (val) => this.remoteFeatures = val)
    ]);
    this.chainListener = ChainController.subscribeChainProp("accountState", (accountState) => {
      this.caipAddress = accountState?.caipAddress;
      this.profileName = accountState?.profileName;
    }, this.namespace);
  }
  disconnectedCallback() {
    this.unsubscribers.forEach((unsubscribe) => unsubscribe());
    this.resizeObserver?.disconnect();
    this.removeScrollListener();
    this.chainListener?.();
  }
  firstUpdated() {
    const walletListEl = this.shadowRoot?.querySelector(".wallet-list");
    if (!walletListEl) {
      return;
    }
    const handleScroll = () => this.updateScrollOpacity(walletListEl);
    requestAnimationFrame(handleScroll);
    walletListEl.addEventListener("scroll", handleScroll);
    this.resizeObserver = new ResizeObserver(handleScroll);
    this.resizeObserver.observe(walletListEl);
    handleScroll();
  }
  render() {
    const namespace = this.namespace;
    if (!namespace) {
      throw new Error("Namespace is not set");
    }
    return T`
      <wui-flex flexDirection="column" .padding=${["0", "4", "4", "4"]} gap="4">
        ${this.renderTabs()} ${this.renderHeader(namespace)} ${this.renderConnections(namespace)}
        ${this.renderAddConnectionButton(namespace)}
      </wui-flex>
    `;
  }
  renderTabs() {
    const availableTabs = this.namespaces.map((namespace) => NAMESPACE_TABS.find((tab) => tab.namespace === namespace)).filter(Boolean);
    const tabCount = availableTabs.length;
    if (tabCount > 1) {
      return T`
        <wui-tabs
          .onTabChange=${(index2) => this.handleTabChange(index2)}
          .activeTab=${this.currentTab}
          .tabs=${availableTabs}
        ></wui-tabs>
      `;
    }
    return null;
  }
  renderHeader(namespace) {
    const connections = this.getActiveConnections(namespace);
    const totalConnections = connections.flatMap(({ accounts }) => accounts).length + (this.caipAddress ? 1 : 0);
    return T`
      <wui-flex alignItems="center" columngap="1">
        <wui-icon
          size="sm"
          name=${NAMESPACE_ICONS[namespace] ?? NAMESPACE_ICONS.eip155}
        ></wui-icon>
        <wui-text color="secondary" variant="lg-regular"
          >${totalConnections > 1 ? "Wallets" : "Wallet"}</wui-text
        >
        <wui-text
          color="primary"
          variant="lg-regular"
          class="balance-amount"
          data-testid="balance-amount"
        >
          ${totalConnections}
        </wui-text>
        <wui-link
          color="secondary"
          variant="secondary"
          @click=${() => ConnectionController.disconnect({ namespace })}
          ?disabled=${!this.hasAnyConnections(namespace)}
          data-testid="disconnect-all-button"
        >
          Disconnect All
        </wui-link>
      </wui-flex>
    `;
  }
  renderConnections(namespace) {
    const hasConnections = this.hasAnyConnections(namespace);
    const classes = {
      "wallet-list": true,
      "active-wallets-box": hasConnections,
      "empty-wallet-list-box": !hasConnections
    };
    return T`
      <wui-flex flexDirection="column" class=${e(classes)} rowgap="3">
        ${hasConnections ? this.renderActiveConnections(namespace) : this.renderEmptyState(namespace)}
      </wui-flex>
    `;
  }
  renderActiveConnections(namespace) {
    const connections = this.getActiveConnections(namespace);
    const connectorId = this.activeConnectorIds[namespace];
    const plainAddress = this.getPlainAddress();
    return T`
      ${plainAddress || connectorId || connections.length > 0 ? T`<wui-flex
            flexDirection="column"
            .padding=${["4", "0", "4", "0"]}
            class="active-wallets"
          >
            ${this.renderActiveProfile(namespace)} ${this.renderActiveConnectionsList(namespace)}
          </wui-flex>` : null}
      ${this.renderRecentConnections(namespace)}
    `;
  }
  renderActiveProfile(namespace) {
    const connectorId = this.activeConnectorIds[namespace];
    if (!connectorId) {
      return null;
    }
    const { connections } = ConnectionControllerUtil.getConnectionsData(namespace);
    const connector = ConnectorController.getConnectorById(connectorId);
    const connectorImage = AssetUtil.getConnectorImage(connector);
    const plainAddress = this.getPlainAddress();
    if (!plainAddress) {
      return null;
    }
    const isBitcoin = namespace === ConstantsUtil$1.CHAIN.BITCOIN;
    const authData = ConnectionUtil.getAuthData({ connectorId, accounts: [] });
    const shouldShowSeparator = this.getActiveConnections(namespace).flatMap((connection2) => connection2.accounts).length > 0;
    const connection = connections.find((c) => c.connectorId === connectorId);
    const account = connection?.accounts.filter((a) => !HelpersUtil$1.isLowerCaseMatch(a.address, plainAddress));
    return T`
      <wui-flex flexDirection="column" .padding=${["0", "4", "0", "4"]}>
        <wui-active-profile-wallet-item
          address=${plainAddress}
          alt=${connector?.name}
          .content=${this.getProfileContent({
      address: plainAddress,
      connections,
      connectorId,
      namespace
    })}
          .charsStart=${UI_CONFIG.ADDRESS_DISPLAY.START}
          .charsEnd=${UI_CONFIG.ADDRESS_DISPLAY.END}
          .icon=${authData.icon}
          .iconSize=${authData.iconSize}
          .iconBadge=${this.isSmartAccount(plainAddress) ? UI_CONFIG.BADGE.ICON : void 0}
          .iconBadgeSize=${this.isSmartAccount(plainAddress) ? UI_CONFIG.BADGE.SIZE : void 0}
          imageSrc=${connectorImage}
          ?enableMoreButton=${authData.isAuth}
          @copy=${() => this.handleCopyAddress(plainAddress)}
          @disconnect=${() => this.handleDisconnect(namespace, connectorId)}
          @switch=${() => {
      if (isBitcoin && connection && account?.[0]) {
        this.handleSwitchWallet(connection, account[0].address, namespace);
      }
    }}
          @externalLink=${() => this.handleExternalLink(plainAddress)}
          @more=${() => this.handleMore()}
          data-testid="wui-active-profile-wallet-item"
        ></wui-active-profile-wallet-item>
        ${shouldShowSeparator ? T`<wui-separator></wui-separator>` : null}
      </wui-flex>
    `;
  }
  renderActiveConnectionsList(namespace) {
    const connections = this.getActiveConnections(namespace);
    if (connections.length === 0) {
      return null;
    }
    return T`
      <wui-flex flexDirection="column" .padding=${["0", "2", "0", "2"]}>
        ${this.renderConnectionList(connections, false, namespace)}
      </wui-flex>
    `;
  }
  renderRecentConnections(namespace) {
    const { recentConnections } = ConnectionControllerUtil.getConnectionsData(namespace);
    const allAccounts = recentConnections.flatMap((connection) => connection.accounts);
    if (allAccounts.length === 0) {
      return null;
    }
    return T`
      <wui-flex flexDirection="column" .padding=${["0", "2", "0", "2"]} rowGap="2">
        <wui-text color="secondary" variant="sm-medium" data-testid="recently-connected-text"
          >RECENTLY CONNECTED</wui-text
        >
        <wui-flex flexDirection="column" .padding=${["0", "2", "0", "2"]}>
          ${this.renderConnectionList(recentConnections, true, namespace)}
        </wui-flex>
      </wui-flex>
    `;
  }
  renderConnectionList(connections, isRecentConnections, namespace) {
    return connections.filter((connection) => connection.accounts.length > 0).map((connection, connectionIdx) => {
      const connector = ConnectorController.getConnectorById(connection.connectorId);
      const connectorImage = AssetUtil.getConnectorImage(connector) ?? "";
      const authData = ConnectionUtil.getAuthData(connection);
      return connection.accounts.map((account, accountIdx) => {
        const shouldShowSeparator = connectionIdx !== 0 || accountIdx !== 0;
        const isLoading = this.isAccountLoading(connection.connectorId, account.address);
        return T`
            <wui-flex flexDirection="column">
              ${shouldShowSeparator ? T`<wui-separator></wui-separator>` : null}
              <wui-inactive-profile-wallet-item
                address=${account.address}
                alt=${connection.connectorId}
                buttonLabel=${isRecentConnections ? "Connect" : "Switch"}
                buttonVariant=${isRecentConnections ? "neutral-secondary" : "accent-secondary"}
                rightIcon=${isRecentConnections ? "bin" : "power"}
                rightIconSize="sm"
                class=${isRecentConnections ? "recent-connection" : "active-connection"}
                data-testid=${isRecentConnections ? "recent-connection" : "active-connection"}
                imageSrc=${connectorImage}
                .iconBadge=${this.isSmartAccount(account.address) ? UI_CONFIG.BADGE.ICON : void 0}
                .iconBadgeSize=${this.isSmartAccount(account.address) ? UI_CONFIG.BADGE.SIZE : void 0}
                .icon=${authData.icon}
                .iconSize=${authData.iconSize}
                .loading=${isLoading}
                .showBalance=${false}
                .charsStart=${UI_CONFIG.ADDRESS_DISPLAY.START}
                .charsEnd=${UI_CONFIG.ADDRESS_DISPLAY.END}
                @buttonClick=${() => this.handleSwitchWallet(connection, account.address, namespace)}
                @iconClick=${() => this.handleWalletAction({
          connection,
          address: account.address,
          isRecentConnection: isRecentConnections,
          namespace
        })}
              ></wui-inactive-profile-wallet-item>
            </wui-flex>
          `;
      });
    });
  }
  renderAddConnectionButton(namespace) {
    if (!this.isMultiWalletEnabled() && this.caipAddress) {
      return null;
    }
    if (!this.hasAnyConnections(namespace)) {
      return null;
    }
    const { title } = this.getChainLabelInfo(namespace);
    return T`
      <wui-list-item
        variant="icon"
        iconVariant="overlay"
        icon="plus"
        iconSize="sm"
        ?chevron=${true}
        @click=${() => this.handleAddConnection(namespace)}
        data-testid="add-connection-button"
      >
        <wui-text variant="md-medium" color="secondary">${title}</wui-text>
      </wui-list-item>
    `;
  }
  renderEmptyState(namespace) {
    const { title, description } = this.getChainLabelInfo(namespace);
    return T`
      <wui-flex alignItems="flex-start" class="empty-template" data-testid="empty-template">
        <wui-flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          rowgap="3"
          class="empty-box"
        >
          <wui-icon-box size="xl" icon="wallet" color="secondary"></wui-icon-box>

          <wui-flex flexDirection="column" alignItems="center" justifyContent="center" gap="1">
            <wui-text color="primary" variant="lg-regular" data-testid="empty-state-text"
              >No wallet connected</wui-text
            >
            <wui-text color="secondary" variant="md-regular" data-testid="empty-state-description"
              >${description}</wui-text
            >
          </wui-flex>

          <wui-link
            @click=${() => this.handleAddConnection(namespace)}
            data-testid="empty-state-button"
            icon="plus"
          >
            ${title}
          </wui-link>
        </wui-flex>
      </wui-flex>
    `;
  }
  handleTabChange(index2) {
    const nextNamespace = this.namespaces[index2];
    if (nextNamespace) {
      this.chainListener?.();
      this.currentTab = this.namespaces.indexOf(nextNamespace);
      this.namespace = nextNamespace;
      this.caipAddress = ChainController.getAccountData(nextNamespace)?.caipAddress;
      this.profileName = ChainController.getAccountData(nextNamespace)?.profileName;
      this.chainListener = ChainController.subscribeChainProp("accountState", (accountState) => {
        this.caipAddress = accountState?.caipAddress;
      }, nextNamespace);
    }
  }
  async handleSwitchWallet(connection, address, namespace) {
    try {
      this.isSwitching = true;
      this.lastSelectedConnectorId = connection.connectorId;
      this.lastSelectedAddress = address;
      const isDifferentNamespace = this.caipNetwork?.chainNamespace !== namespace;
      if (isDifferentNamespace && connection?.caipNetwork) {
        ConnectorController.setFilterByNamespace(namespace);
        await ChainController.switchActiveNetwork(connection?.caipNetwork);
      }
      await ConnectionController.switchConnection({
        connection,
        address,
        namespace,
        closeModalOnConnect: false,
        onChange({ hasSwitchedAccount, hasSwitchedWallet }) {
          if (hasSwitchedWallet) {
            SnackController.showSuccess("Wallet switched");
          } else if (hasSwitchedAccount) {
            SnackController.showSuccess("Account switched");
          }
        }
      });
    } catch (error) {
      SnackController.showError("Failed to switch wallet");
    } finally {
      this.isSwitching = false;
    }
  }
  handleWalletAction(params) {
    const { connection, address, isRecentConnection, namespace } = params;
    if (isRecentConnection) {
      StorageUtil.deleteAddressFromConnection({
        connectorId: connection.connectorId,
        address,
        namespace
      });
      ConnectionController.syncStorageConnections();
      SnackController.showSuccess("Wallet deleted");
    } else {
      this.handleDisconnect(namespace, connection.connectorId);
    }
  }
  async handleDisconnect(namespace, id) {
    try {
      await ConnectionController.disconnect({ id, namespace });
      SnackController.showSuccess("Wallet disconnected");
    } catch {
      SnackController.showError("Failed to disconnect wallet");
    }
  }
  handleCopyAddress(address) {
    CoreHelperUtil.copyToClopboard(address);
    SnackController.showSuccess("Address copied");
  }
  handleMore() {
    RouterController.push("AccountSettings");
  }
  handleExternalLink(address) {
    const explorerUrl = this.caipNetwork?.blockExplorers?.default.url;
    if (explorerUrl) {
      CoreHelperUtil.openHref(`${explorerUrl}/address/${address}`, "_blank");
    }
  }
  handleAddConnection(namespace) {
    ConnectorController.setFilterByNamespace(namespace);
    RouterController.push("Connect", {
      addWalletForNamespace: namespace
    });
  }
  getChainLabelInfo(namespace) {
    return CHAIN_LABELS[namespace] ?? {
      title: "Add Wallet",
      description: "Add your first wallet"
    };
  }
  isSmartAccount(address) {
    if (!this.namespace) {
      return false;
    }
    const smartAccount = this.user?.accounts?.find((account) => account.type === "smartAccount");
    if (smartAccount && address) {
      return HelpersUtil$1.isLowerCaseMatch(smartAccount.address, address);
    }
    return false;
  }
  getPlainAddress() {
    return this.caipAddress ? CoreHelperUtil.getPlainAddress(this.caipAddress) : void 0;
  }
  getActiveConnections(namespace) {
    const connectorId = this.activeConnectorIds[namespace];
    const { connections } = ConnectionControllerUtil.getConnectionsData(namespace);
    const [connectedConnection] = connections.filter((connection) => HelpersUtil$1.isLowerCaseMatch(connection.connectorId, connectorId));
    if (!connectorId) {
      return connections;
    }
    const isBitcoin = namespace === ConstantsUtil$1.CHAIN.BITCOIN;
    const { address } = this.caipAddress ? ParseUtil.parseCaipAddress(this.caipAddress) : {};
    let addresses = [...address ? [address] : []];
    if (isBitcoin && connectedConnection) {
      addresses = connectedConnection.accounts.map((account) => account.address) || [];
    }
    return ConnectionControllerUtil.excludeConnectorAddressFromConnections({
      connectorId,
      addresses,
      connections
    });
  }
  hasAnyConnections(namespace) {
    const connections = this.getActiveConnections(namespace);
    const { recentConnections } = ConnectionControllerUtil.getConnectionsData(namespace);
    return Boolean(this.caipAddress) || connections.length > 0 || recentConnections.length > 0;
  }
  isAccountLoading(connectorId, address) {
    return HelpersUtil$1.isLowerCaseMatch(this.lastSelectedConnectorId, connectorId) && HelpersUtil$1.isLowerCaseMatch(this.lastSelectedAddress, address) && this.isSwitching;
  }
  getProfileContent(params) {
    const { address, connections, connectorId, namespace } = params;
    const [connectedConnection] = connections.filter((connection) => HelpersUtil$1.isLowerCaseMatch(connection.connectorId, connectorId));
    if (namespace === ConstantsUtil$1.CHAIN.BITCOIN && connectedConnection?.accounts.every((account) => typeof account.type === "string")) {
      return this.getBitcoinProfileContent(connectedConnection.accounts, address);
    }
    const authData = ConnectionUtil.getAuthData({ connectorId, accounts: [] });
    return [
      {
        address,
        tagLabel: "Active",
        tagVariant: "success",
        enableButton: true,
        profileName: this.profileName,
        buttonType: "disconnect",
        buttonLabel: "Disconnect",
        buttonVariant: "neutral-secondary",
        ...authData.isAuth ? { description: this.isSmartAccount(address) ? "Smart Account" : "EOA Account" } : {}
      }
    ];
  }
  getBitcoinProfileContent(accounts, address) {
    const hasMultipleAccounts = accounts.length > 1;
    const plainAddress = this.getPlainAddress();
    return accounts.map((account) => {
      const isConnected = HelpersUtil$1.isLowerCaseMatch(account.address, plainAddress);
      let label = "PAYMENT";
      if (account.type === "ordinal") {
        label = "ORDINALS";
      }
      return {
        address: account.address,
        tagLabel: HelpersUtil$1.isLowerCaseMatch(account.address, address) ? "Active" : void 0,
        tagVariant: HelpersUtil$1.isLowerCaseMatch(account.address, address) ? "success" : void 0,
        enableButton: true,
        ...hasMultipleAccounts ? {
          label,
          alignItems: "flex-end",
          buttonType: isConnected ? "disconnect" : "switch",
          buttonLabel: isConnected ? "Disconnect" : "Switch",
          buttonVariant: isConnected ? "neutral-secondary" : "accent-secondary"
        } : {
          alignItems: "center",
          buttonType: "disconnect",
          buttonLabel: "Disconnect",
          buttonVariant: "neutral-secondary"
        }
      };
    });
  }
  removeScrollListener() {
    const connectEl = this.shadowRoot?.querySelector(".wallet-list");
    if (connectEl) {
      connectEl.removeEventListener("scroll", () => this.handleConnectListScroll());
    }
  }
  handleConnectListScroll() {
    const walletListEl = this.shadowRoot?.querySelector(".wallet-list");
    if (walletListEl) {
      this.updateScrollOpacity(walletListEl);
    }
  }
  isMultiWalletEnabled() {
    return Boolean(this.remoteFeatures?.multiWallet);
  }
  updateScrollOpacity(element) {
    element.style.setProperty("--connect-scroll--top-opacity", MathUtil.interpolate([0, UI_CONFIG.SCROLL_THRESHOLD], UI_CONFIG.OPACITY_RANGE, element.scrollTop).toString());
    element.style.setProperty("--connect-scroll--bottom-opacity", MathUtil.interpolate([0, UI_CONFIG.SCROLL_THRESHOLD], UI_CONFIG.OPACITY_RANGE, element.scrollHeight - element.scrollTop - element.offsetHeight).toString());
  }
  onConnectionsChange() {
    if (this.isMultiWalletEnabled()) {
      if (this.namespace) {
        const { connections } = ConnectionControllerUtil.getConnectionsData(this.namespace);
        if (connections.length === 0) {
          RouterController.reset("ProfileWallets");
        }
      }
    }
    this.requestUpdate();
  }
};
W3mProfileWalletsView.styles = styles$11;
__decorate$1t([
  r()
], W3mProfileWalletsView.prototype, "currentTab", void 0);
__decorate$1t([
  r()
], W3mProfileWalletsView.prototype, "namespace", void 0);
__decorate$1t([
  r()
], W3mProfileWalletsView.prototype, "namespaces", void 0);
__decorate$1t([
  r()
], W3mProfileWalletsView.prototype, "caipAddress", void 0);
__decorate$1t([
  r()
], W3mProfileWalletsView.prototype, "profileName", void 0);
__decorate$1t([
  r()
], W3mProfileWalletsView.prototype, "activeConnectorIds", void 0);
__decorate$1t([
  r()
], W3mProfileWalletsView.prototype, "lastSelectedAddress", void 0);
__decorate$1t([
  r()
], W3mProfileWalletsView.prototype, "lastSelectedConnectorId", void 0);
__decorate$1t([
  r()
], W3mProfileWalletsView.prototype, "isSwitching", void 0);
__decorate$1t([
  r()
], W3mProfileWalletsView.prototype, "caipNetwork", void 0);
__decorate$1t([
  r()
], W3mProfileWalletsView.prototype, "user", void 0);
__decorate$1t([
  r()
], W3mProfileWalletsView.prototype, "remoteFeatures", void 0);
W3mProfileWalletsView = __decorate$1t([
  customElement("w3m-profile-wallets-view")
], W3mProfileWalletsView);
var __decorate$1s = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mFundWalletView = class W3mFundWalletView2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.activeCaipNetwork = ChainController.state.activeCaipNetwork;
    this.features = OptionsController.state.features;
    this.remoteFeatures = OptionsController.state.remoteFeatures;
    this.exchangesLoading = ExchangeController.state.isLoading;
    this.exchanges = ExchangeController.state.exchanges;
    this.unsubscribe.push(...[
      OptionsController.subscribeKey("features", (val) => this.features = val),
      OptionsController.subscribeKey("remoteFeatures", (val) => this.remoteFeatures = val),
      ChainController.subscribeKey("activeCaipNetwork", (val) => {
        this.activeCaipNetwork = val;
        this.setDefaultPaymentAsset();
      }),
      ExchangeController.subscribeKey("isLoading", (val) => this.exchangesLoading = val),
      ExchangeController.subscribeKey("exchanges", (val) => this.exchanges = val)
    ]);
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  async firstUpdated() {
    const isPayWithExchangeSupported = ExchangeController.isPayWithExchangeSupported();
    if (isPayWithExchangeSupported) {
      await this.setDefaultPaymentAsset();
      await ExchangeController.fetchExchanges();
    }
  }
  render() {
    return T`
      <wui-flex flexDirection="column" .padding=${["1", "3", "3", "3"]} gap="2">
        ${this.onrampTemplate()} ${this.receiveTemplate()} ${this.depositFromExchangeTemplate()}
      </wui-flex>
    `;
  }
  async setDefaultPaymentAsset() {
    if (!this.activeCaipNetwork) {
      return;
    }
    const assets = await ExchangeController.getAssetsForNetwork(this.activeCaipNetwork.caipNetworkId);
    const usdc = assets.find((asset) => asset.metadata.symbol === "USDC") || assets[0];
    if (usdc) {
      ExchangeController.setPaymentAsset(usdc);
    }
  }
  onrampTemplate() {
    if (!this.activeCaipNetwork) {
      return null;
    }
    const isOnrampEnabled = this.remoteFeatures?.onramp;
    const hasNetworkSupport = ConstantsUtil$2.ONRAMP_SUPPORTED_CHAIN_NAMESPACES.includes(this.activeCaipNetwork.chainNamespace);
    if (!isOnrampEnabled || !hasNetworkSupport) {
      return null;
    }
    return T`
      <wui-list-item
        @click=${this.onBuyCrypto.bind(this)}
        icon="card"
        data-testid="wallet-features-onramp-button"
      >
        <wui-text variant="lg-regular" color="primary">Buy crypto</wui-text>
      </wui-list-item>
    `;
  }
  depositFromExchangeTemplate() {
    if (!this.activeCaipNetwork) {
      return null;
    }
    const isPayWithExchangeSupported = ExchangeController.isPayWithExchangeSupported();
    if (!isPayWithExchangeSupported) {
      return null;
    }
    return T`
      <wui-list-item
        @click=${this.onDepositFromExchange.bind(this)}
        icon="arrowBottomCircle"
        data-testid="wallet-features-deposit-from-exchange-button"
        ?loading=${this.exchangesLoading}
        ?disabled=${this.exchangesLoading || !this.exchanges.length}
      >
        <wui-text variant="lg-regular" color="primary">Deposit from exchange</wui-text>
      </wui-list-item>
    `;
  }
  receiveTemplate() {
    const isReceiveEnabled = Boolean(this.features?.receive);
    if (!isReceiveEnabled) {
      return null;
    }
    return T`
      <wui-list-item
        @click=${this.onReceive.bind(this)}
        icon="qrCode"
        data-testid="wallet-features-receive-button"
      >
        <wui-text variant="lg-regular" color="primary">Receive funds</wui-text>
      </wui-list-item>
    `;
  }
  onBuyCrypto() {
    RouterController.push("OnRampProviders");
  }
  onReceive() {
    RouterController.push("WalletReceive");
  }
  onDepositFromExchange() {
    ExchangeController.reset();
    RouterController.push("PayWithExchange", {
      redirectView: RouterController.state.data?.redirectView
    });
  }
};
__decorate$1s([
  r()
], W3mFundWalletView.prototype, "activeCaipNetwork", void 0);
__decorate$1s([
  r()
], W3mFundWalletView.prototype, "features", void 0);
__decorate$1s([
  r()
], W3mFundWalletView.prototype, "remoteFeatures", void 0);
__decorate$1s([
  r()
], W3mFundWalletView.prototype, "exchangesLoading", void 0);
__decorate$1s([
  r()
], W3mFundWalletView.prototype, "exchanges", void 0);
W3mFundWalletView = __decorate$1s([
  customElement("w3m-fund-wallet-view")
], W3mFundWalletView);
const styles$10 = css`
  button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 104px;
    row-gap: ${({ spacing }) => spacing["2"]};
    padding: ${({ spacing }) => spacing["3"]} ${({ spacing }) => spacing["0"]};
    background-color: ${({ tokens }) => tokens.theme.foregroundPrimary};
    border-radius: clamp(0px, ${({ borderRadius }) => borderRadius["4"]}, 20px);
    transition:
      color ${({ durations }) => durations["lg"]} ${({ easings }) => easings["ease-out-power-1"]},
      background-color ${({ durations }) => durations["lg"]}
        ${({ easings }) => easings["ease-out-power-1"]},
      border-radius ${({ durations }) => durations["lg"]}
        ${({ easings }) => easings["ease-out-power-1"]};
    will-change: background-color, color, border-radius;
    outline: none;
    border: none;
  }

  button > wui-flex > wui-text {
    color: ${({ tokens }) => tokens.theme.textPrimary};
    max-width: 86px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    justify-content: center;
  }

  button > wui-flex > wui-text.certified {
    max-width: 66px;
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: ${({ tokens }) => tokens.theme.foregroundSecondary};
    }
  }

  button:disabled > wui-flex > wui-text {
    color: ${({ tokens }) => tokens.core.glass010};
  }

  [data-selected='true'] {
    background-color: ${({ colors }) => colors.accent020};
  }

  @media (hover: hover) and (pointer: fine) {
    [data-selected='true']:hover:enabled {
      background-color: ${({ colors }) => colors.accent010};
    }
  }

  [data-selected='true']:active:enabled {
    background-color: ${({ colors }) => colors.accent010};
  }

  @media (max-width: 350px) {
    button {
      width: 100%;
    }
  }
`;
var __decorate$1r = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mAllWalletsListItem = class W3mAllWalletsListItem2 extends i {
  constructor() {
    super();
    this.observer = new IntersectionObserver(() => void 0);
    this.visible = false;
    this.imageSrc = void 0;
    this.imageLoading = false;
    this.isImpressed = false;
    this.explorerId = "";
    this.walletQuery = "";
    this.certified = false;
    this.displayIndex = 0;
    this.wallet = void 0;
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.visible = true;
          this.fetchImageSrc();
          this.sendImpressionEvent();
        } else {
          this.visible = false;
        }
      });
    }, { threshold: 0.01 });
  }
  firstUpdated() {
    this.observer.observe(this);
  }
  disconnectedCallback() {
    this.observer.disconnect();
  }
  render() {
    const certified = this.wallet?.badge_type === "certified";
    return T`
      <button>
        ${this.imageTemplate()}
        <wui-flex flexDirection="row" alignItems="center" justifyContent="center" gap="1">
          <wui-text
            variant="md-regular"
            color="inherit"
            class=${o(certified ? "certified" : void 0)}
            >${this.wallet?.name}</wui-text
          >
          ${certified ? T`<wui-icon size="sm" name="walletConnectBrown"></wui-icon>` : null}
        </wui-flex>
      </button>
    `;
  }
  imageTemplate() {
    if (!this.visible && !this.imageSrc || this.imageLoading) {
      return this.shimmerTemplate();
    }
    return T`
      <wui-wallet-image
        size="lg"
        imageSrc=${o(this.imageSrc)}
        name=${o(this.wallet?.name)}
        .installed=${this.wallet?.installed ?? false}
        badgeSize="sm"
      >
      </wui-wallet-image>
    `;
  }
  shimmerTemplate() {
    return T`<wui-shimmer width="56px" height="56px"></wui-shimmer>`;
  }
  async fetchImageSrc() {
    if (!this.wallet) {
      return;
    }
    this.imageSrc = AssetUtil.getWalletImage(this.wallet);
    if (this.imageSrc) {
      return;
    }
    this.imageLoading = true;
    this.imageSrc = await AssetUtil.fetchWalletImage(this.wallet.image_id);
    this.imageLoading = false;
  }
  sendImpressionEvent() {
    if (!this.wallet || this.isImpressed) {
      return;
    }
    this.isImpressed = true;
    EventsController.sendWalletImpressionEvent({
      name: this.wallet.name,
      walletRank: this.wallet.order,
      explorerId: this.explorerId,
      view: RouterController.state.view,
      query: this.walletQuery,
      certified: this.certified,
      displayIndex: this.displayIndex
    });
  }
};
W3mAllWalletsListItem.styles = styles$10;
__decorate$1r([
  r()
], W3mAllWalletsListItem.prototype, "visible", void 0);
__decorate$1r([
  r()
], W3mAllWalletsListItem.prototype, "imageSrc", void 0);
__decorate$1r([
  r()
], W3mAllWalletsListItem.prototype, "imageLoading", void 0);
__decorate$1r([
  r()
], W3mAllWalletsListItem.prototype, "isImpressed", void 0);
__decorate$1r([
  n()
], W3mAllWalletsListItem.prototype, "explorerId", void 0);
__decorate$1r([
  n()
], W3mAllWalletsListItem.prototype, "walletQuery", void 0);
__decorate$1r([
  n()
], W3mAllWalletsListItem.prototype, "certified", void 0);
__decorate$1r([
  n()
], W3mAllWalletsListItem.prototype, "displayIndex", void 0);
__decorate$1r([
  n({ type: Object })
], W3mAllWalletsListItem.prototype, "wallet", void 0);
W3mAllWalletsListItem = __decorate$1r([
  customElement("w3m-all-wallets-list-item")
], W3mAllWalletsListItem);
const styles$$ = css`
  wui-grid {
    max-height: clamp(360px, 400px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  :host([data-mobile-fullscreen='true']) wui-grid {
    max-height: none;
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  w3m-all-wallets-list-item {
    opacity: 0;
    animation-duration: ${({ durations }) => durations["xl"]};
    animation-timing-function: ${({ easings }) => easings["ease-inout-power-2"]};
    animation-name: fade-in;
    animation-fill-mode: forwards;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  wui-loading-spinner {
    padding-top: ${({ spacing }) => spacing["4"]};
    padding-bottom: ${({ spacing }) => spacing["4"]};
    justify-content: center;
    grid-column: 1 / span 4;
  }
`;
var __decorate$1q = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
const PAGINATOR_ID = "local-paginator";
let W3mAllWalletsList = class W3mAllWalletsList2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.paginationObserver = void 0;
    this.loading = !ApiController.state.wallets.length;
    this.wallets = ApiController.state.wallets;
    this.mobileFullScreen = OptionsController.state.enableMobileFullScreen;
    this.unsubscribe.push(...[ApiController.subscribeKey("wallets", (val) => this.wallets = val)]);
  }
  firstUpdated() {
    if (this.mobileFullScreen) {
      this.setAttribute("data-mobile-fullscreen", "true");
    }
    this.initialFetch();
    this.createPaginationObserver();
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
    this.paginationObserver?.disconnect();
  }
  render() {
    return T`
      <wui-grid
        data-scroll=${!this.loading}
        .padding=${["0", "3", "3", "3"]}
        gap="2"
        justifyContent="space-between"
      >
        ${this.loading ? this.shimmerTemplate(16) : this.walletsTemplate()}
        ${this.paginationLoaderTemplate()}
      </wui-grid>
    `;
  }
  async initialFetch() {
    this.loading = true;
    const gridEl = this.shadowRoot?.querySelector("wui-grid");
    if (gridEl) {
      await ApiController.fetchWalletsByPage({ page: 1 });
      await gridEl.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 200,
        fill: "forwards",
        easing: "ease"
      }).finished;
      this.loading = false;
      gridEl.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 200,
        fill: "forwards",
        easing: "ease"
      });
    }
  }
  shimmerTemplate(items, id) {
    return [...Array(items)].map(() => T`
        <wui-card-select-loader type="wallet" id=${o(id)}></wui-card-select-loader>
      `);
  }
  walletsTemplate() {
    return WalletUtil.getWalletConnectWallets(this.wallets).map((wallet, index2) => T`
        <w3m-all-wallets-list-item
          data-testid="wallet-search-item-${wallet.id}"
          @click=${() => this.onConnectWallet(wallet)}
          .wallet=${wallet}
          explorerId=${wallet.id}
          certified=${this.badge === "certified"}
          displayIndex=${index2}
        ></w3m-all-wallets-list-item>
      `);
  }
  paginationLoaderTemplate() {
    const { wallets, recommended, featured, count, mobileFilteredOutWalletsLength } = ApiController.state;
    const columns = window.innerWidth < 352 ? 3 : 4;
    const currentWallets = wallets.length + recommended.length;
    const minimumRows = Math.ceil(currentWallets / columns);
    let shimmerCount = minimumRows * columns - currentWallets + columns;
    shimmerCount -= wallets.length ? featured.length % columns : 0;
    if (count === 0 && featured.length > 0) {
      return null;
    }
    if (count === 0 || [...featured, ...wallets, ...recommended].length < count - (mobileFilteredOutWalletsLength ?? 0)) {
      return this.shimmerTemplate(shimmerCount, PAGINATOR_ID);
    }
    return null;
  }
  createPaginationObserver() {
    const loaderEl = this.shadowRoot?.querySelector(`#${PAGINATOR_ID}`);
    if (loaderEl) {
      this.paginationObserver = new IntersectionObserver(([element]) => {
        if (element?.isIntersecting && !this.loading) {
          const { page, count, wallets } = ApiController.state;
          if (wallets.length < count) {
            ApiController.fetchWalletsByPage({ page: page + 1 });
          }
        }
      });
      this.paginationObserver.observe(loaderEl);
    }
  }
  onConnectWallet(wallet) {
    ConnectorController.selectWalletConnector(wallet);
  }
};
W3mAllWalletsList.styles = styles$$;
__decorate$1q([
  r()
], W3mAllWalletsList.prototype, "loading", void 0);
__decorate$1q([
  r()
], W3mAllWalletsList.prototype, "wallets", void 0);
__decorate$1q([
  r()
], W3mAllWalletsList.prototype, "badge", void 0);
__decorate$1q([
  r()
], W3mAllWalletsList.prototype, "mobileFullScreen", void 0);
W3mAllWalletsList = __decorate$1q([
  customElement("w3m-all-wallets-list")
], W3mAllWalletsList);
const styles$_ = i$1`
  wui-grid,
  wui-loading-spinner,
  wui-flex {
    height: 360px;
  }

  wui-grid {
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  :host([data-mobile-fullscreen='true']) wui-grid {
    max-height: none;
    height: auto;
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-loading-spinner {
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;
var __decorate$1p = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mAllWalletsSearch = class W3mAllWalletsSearch2 extends i {
  constructor() {
    super(...arguments);
    this.prevQuery = "";
    this.prevBadge = void 0;
    this.loading = true;
    this.mobileFullScreen = OptionsController.state.enableMobileFullScreen;
    this.query = "";
  }
  render() {
    if (this.mobileFullScreen) {
      this.setAttribute("data-mobile-fullscreen", "true");
    }
    this.onSearch();
    return this.loading ? T`<wui-loading-spinner color="accent-primary"></wui-loading-spinner>` : this.walletsTemplate();
  }
  async onSearch() {
    if (this.query.trim() !== this.prevQuery.trim() || this.badge !== this.prevBadge) {
      this.prevQuery = this.query;
      this.prevBadge = this.badge;
      this.loading = true;
      await ApiController.searchWallet({ search: this.query, badge: this.badge });
      this.loading = false;
    }
  }
  walletsTemplate() {
    const { search } = ApiController.state;
    const markedInstalledWallets = WalletUtil.markWalletsAsInstalled(search);
    const walletsByWcSupport = WalletUtil.filterWalletsByWcSupport(markedInstalledWallets);
    if (!walletsByWcSupport.length) {
      return T`
        <wui-flex
          data-testid="no-wallet-found"
          justifyContent="center"
          alignItems="center"
          gap="3"
          flexDirection="column"
        >
          <wui-icon-box size="lg" color="default" icon="wallet"></wui-icon-box>
          <wui-text data-testid="no-wallet-found-text" color="secondary" variant="md-medium">
            No Wallet found
          </wui-text>
        </wui-flex>
      `;
    }
    return T`
      <wui-grid
        data-testid="wallet-list"
        .padding=${["0", "3", "3", "3"]}
        rowGap="4"
        columngap="2"
        justifyContent="space-between"
      >
        ${walletsByWcSupport.map((wallet, index2) => T`
            <w3m-all-wallets-list-item
              @click=${() => this.onConnectWallet(wallet)}
              .wallet=${wallet}
              data-testid="wallet-search-item-${wallet.id}"
              explorerId=${wallet.id}
              certified=${this.badge === "certified"}
              walletQuery=${this.query}
              displayIndex=${index2}
            ></w3m-all-wallets-list-item>
          `)}
      </wui-grid>
    `;
  }
  onConnectWallet(wallet) {
    ConnectorController.selectWalletConnector(wallet);
  }
};
W3mAllWalletsSearch.styles = styles$_;
__decorate$1p([
  r()
], W3mAllWalletsSearch.prototype, "loading", void 0);
__decorate$1p([
  r()
], W3mAllWalletsSearch.prototype, "mobileFullScreen", void 0);
__decorate$1p([
  n()
], W3mAllWalletsSearch.prototype, "query", void 0);
__decorate$1p([
  n()
], W3mAllWalletsSearch.prototype, "badge", void 0);
W3mAllWalletsSearch = __decorate$1p([
  customElement("w3m-all-wallets-search")
], W3mAllWalletsSearch);
var __decorate$1o = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mAllWalletsView = class W3mAllWalletsView2 extends i {
  constructor() {
    super(...arguments);
    this.search = "";
    this.badge = void 0;
    this.onDebouncedSearch = CoreHelperUtil.debounce((value) => {
      this.search = value;
    });
  }
  render() {
    const isSearch = this.search.length >= 2;
    return T`
      <wui-flex .padding=${["1", "3", "3", "3"]} gap="2" alignItems="center">
        <wui-search-bar @inputChange=${this.onInputChange.bind(this)}></wui-search-bar>
        <wui-certified-switch
          ?checked=${this.badge === "certified"}
          @certifiedSwitchChange=${this.onCertifiedSwitchChange.bind(this)}
          data-testid="wui-certified-switch"
        ></wui-certified-switch>
        ${this.qrButtonTemplate()}
      </wui-flex>
      ${isSearch || this.badge ? T`<w3m-all-wallets-search
            query=${this.search}
            .badge=${this.badge}
          ></w3m-all-wallets-search>` : T`<w3m-all-wallets-list .badge=${this.badge}></w3m-all-wallets-list>`}
    `;
  }
  onInputChange(event) {
    this.onDebouncedSearch(event.detail);
  }
  onCertifiedSwitchChange(event) {
    if (event.detail) {
      this.badge = "certified";
      SnackController.showSvg("Only WalletConnect certified", {
        icon: "walletConnectBrown",
        iconColor: "accent-100"
      });
    } else {
      this.badge = void 0;
    }
  }
  qrButtonTemplate() {
    if (CoreHelperUtil.isMobile()) {
      return T`
        <wui-icon-box
          size="xl"
          iconSize="xl"
          color="accent-primary"
          icon="qrCode"
          border
          borderColor="wui-accent-glass-010"
          @click=${this.onWalletConnectQr.bind(this)}
        ></wui-icon-box>
      `;
    }
    return null;
  }
  onWalletConnectQr() {
    RouterController.push("ConnectingWalletConnect");
  }
};
__decorate$1o([
  r()
], W3mAllWalletsView.prototype, "search", void 0);
__decorate$1o([
  r()
], W3mAllWalletsView.prototype, "badge", void 0);
W3mAllWalletsView = __decorate$1o([
  customElement("w3m-all-wallets-view")
], W3mAllWalletsView);
const styles$Z = css`
  wui-separator {
    margin: ${({ spacing }) => spacing["3"]} calc(${({ spacing }) => spacing["3"]} * -1);
    width: calc(100% + ${({ spacing }) => spacing["3"]} * 2);
  }

  wui-email-input {
    width: 100%;
  }

  form {
    width: 100%;
    display: block;
    position: relative;
  }

  wui-icon-link,
  wui-loading-spinner {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  wui-icon-link {
    right: ${({ spacing }) => spacing["2"]};
  }

  wui-loading-spinner {
    right: ${({ spacing }) => spacing["3"]};
  }

  wui-text {
    margin: ${({ spacing }) => spacing["2"]} ${({ spacing }) => spacing["3"]}
      ${({ spacing }) => spacing["0"]} ${({ spacing }) => spacing["3"]};
  }
`;
var __decorate$1n = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mEmailLoginWidget = class W3mEmailLoginWidget2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.formRef = e$1();
    this.email = "";
    this.loading = false;
    this.error = "";
    this.remoteFeatures = OptionsController.state.remoteFeatures;
    this.hasExceededUsageLimit = ApiController.state.plan.hasExceededUsageLimit;
    this.unsubscribe.push(OptionsController.subscribeKey("remoteFeatures", (val) => {
      this.remoteFeatures = val;
    }), ApiController.subscribeKey("plan", (val) => this.hasExceededUsageLimit = val.hasExceededUsageLimit));
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  firstUpdated() {
    this.formRef.value?.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this.onSubmitEmail(event);
      }
    });
  }
  render() {
    const hasConnection = ConnectionController.hasAnyConnection(ConstantsUtil$1.CONNECTOR_ID.AUTH);
    return T`
      <form ${n$1(this.formRef)} @submit=${this.onSubmitEmail.bind(this)}>
        <wui-email-input
          @focus=${this.onFocusEvent.bind(this)}
          .disabled=${this.loading}
          @inputChange=${this.onEmailInputChange.bind(this)}
          tabIdx=${o(this.tabIdx)}
          ?disabled=${hasConnection || this.hasExceededUsageLimit}
        >
        </wui-email-input>

        ${this.submitButtonTemplate()}${this.loadingTemplate()}
        <input type="submit" hidden />
      </form>
      ${this.templateError()}
    `;
  }
  submitButtonTemplate() {
    const showSubmit = !this.loading && this.email.length > 3;
    return showSubmit ? T`
          <wui-icon-link
            size="lg"
            icon="chevronRight"
            iconcolor="accent-100"
            @click=${this.onSubmitEmail.bind(this)}
          >
          </wui-icon-link>
        ` : null;
  }
  loadingTemplate() {
    return this.loading ? T`<wui-loading-spinner size="md" color="accent-primary"></wui-loading-spinner>` : null;
  }
  templateError() {
    if (this.error) {
      return T`<wui-text variant="sm-medium" color="error">${this.error}</wui-text>`;
    }
    return null;
  }
  onEmailInputChange(event) {
    this.email = event.detail.trim();
    this.error = "";
  }
  async onSubmitEmail(event) {
    if (!HelpersUtil.isValidEmail(this.email)) {
      AlertController.open({
        displayMessage: ErrorUtil.ALERT_WARNINGS.INVALID_EMAIL.displayMessage
      }, "warning");
      return;
    }
    const isAvailableChain = ConstantsUtil$1.AUTH_CONNECTOR_SUPPORTED_CHAINS.find((chain) => chain === ChainController.state.activeChain);
    if (!isAvailableChain) {
      const caipNetwork = ChainController.getFirstCaipNetworkSupportsAuthConnector();
      if (caipNetwork) {
        RouterController.push("SwitchNetwork", { network: caipNetwork });
        return;
      }
    }
    try {
      if (this.loading) {
        return;
      }
      this.loading = true;
      event.preventDefault();
      const authConnector = ConnectorController.getAuthConnector();
      if (!authConnector) {
        throw new Error("w3m-email-login-widget: Auth connector not found");
      }
      const { action } = await authConnector.provider.connectEmail({ email: this.email });
      EventsController.sendEvent({ type: "track", event: "EMAIL_SUBMITTED" });
      if (action === "VERIFY_OTP") {
        EventsController.sendEvent({ type: "track", event: "EMAIL_VERIFICATION_CODE_SENT" });
        RouterController.push("EmailVerifyOtp", { email: this.email });
      } else if (action === "VERIFY_DEVICE") {
        RouterController.push("EmailVerifyDevice", { email: this.email });
      } else if (action === "CONNECT") {
        const isMultiWalletEnabled = this.remoteFeatures?.multiWallet;
        await ConnectionController.connectExternal(authConnector, ChainController.state.activeChain);
        if (isMultiWalletEnabled) {
          RouterController.replace("ProfileWallets");
          SnackController.showSuccess("New Wallet Added");
        } else {
          RouterController.replace("Account");
        }
      }
    } catch (error) {
      const parsedError = CoreHelperUtil.parseError(error);
      if (parsedError?.includes("Invalid email")) {
        this.error = "Invalid email. Try again.";
      } else {
        SnackController.showError(error);
      }
    } finally {
      this.loading = false;
    }
  }
  onFocusEvent() {
    EventsController.sendEvent({ type: "track", event: "EMAIL_LOGIN_SELECTED" });
  }
};
W3mEmailLoginWidget.styles = styles$Z;
__decorate$1n([
  n()
], W3mEmailLoginWidget.prototype, "tabIdx", void 0);
__decorate$1n([
  r()
], W3mEmailLoginWidget.prototype, "email", void 0);
__decorate$1n([
  r()
], W3mEmailLoginWidget.prototype, "loading", void 0);
__decorate$1n([
  r()
], W3mEmailLoginWidget.prototype, "error", void 0);
__decorate$1n([
  r()
], W3mEmailLoginWidget.prototype, "remoteFeatures", void 0);
__decorate$1n([
  r()
], W3mEmailLoginWidget.prototype, "hasExceededUsageLimit", void 0);
W3mEmailLoginWidget = __decorate$1n([
  customElement("w3m-email-login-widget")
], W3mEmailLoginWidget);
const styles$Y = css`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  wui-checkbox {
    padding: ${({ spacing }) => spacing["3"]};
  }
  a {
    text-decoration: none;
    color: ${({ tokens }) => tokens.theme.textSecondary};
    font-weight: 500;
  }
`;
var __decorate$1m = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mLegalCheckbox = class W3mLegalCheckbox2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.checked = OptionsStateController.state.isLegalCheckboxChecked;
    this.unsubscribe.push(OptionsStateController.subscribeKey("isLegalCheckboxChecked", (val) => {
      this.checked = val;
    }));
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    const { termsConditionsUrl, privacyPolicyUrl } = OptionsController.state;
    const legalCheckbox = OptionsController.state.features?.legalCheckbox;
    if (!termsConditionsUrl && !privacyPolicyUrl) {
      return null;
    }
    if (!legalCheckbox) {
      return null;
    }
    return T`
      <wui-checkbox
        ?checked=${this.checked}
        @checkboxChange=${this.onCheckboxChange.bind(this)}
        data-testid="wui-checkbox"
      >
        <wui-text color="secondary" variant="sm-regular" align="left">
          I agree to our ${this.termsTemplate()} ${this.andTemplate()} ${this.privacyTemplate()}
        </wui-text>
      </wui-checkbox>
    `;
  }
  andTemplate() {
    const { termsConditionsUrl, privacyPolicyUrl } = OptionsController.state;
    return termsConditionsUrl && privacyPolicyUrl ? "and" : "";
  }
  termsTemplate() {
    const { termsConditionsUrl } = OptionsController.state;
    if (!termsConditionsUrl) {
      return null;
    }
    return T`<a rel="noreferrer" target="_blank" href=${termsConditionsUrl}>terms of service</a>`;
  }
  privacyTemplate() {
    const { privacyPolicyUrl } = OptionsController.state;
    if (!privacyPolicyUrl) {
      return null;
    }
    return T`<a rel="noreferrer" target="_blank" href=${privacyPolicyUrl}>privacy policy</a>`;
  }
  onCheckboxChange() {
    OptionsStateController.setIsLegalCheckboxChecked(!this.checked);
  }
};
W3mLegalCheckbox.styles = [styles$Y];
__decorate$1m([
  r()
], W3mLegalCheckbox.prototype, "checked", void 0);
W3mLegalCheckbox = __decorate$1m([
  customElement("w3m-legal-checkbox")
], W3mLegalCheckbox);
const styles$X = css`
  wui-separator {
    margin: ${({ spacing }) => spacing["3"]} calc(${({ spacing }) => spacing["3"]} * -1)
      ${({ spacing }) => spacing["3"]} calc(${({ spacing }) => spacing["3"]} * -1);
    width: calc(100% + ${({ spacing }) => spacing["3"]} * 2);
  }
`;
var __decorate$1l = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
const MAX_TOP_VIEW = 2;
const MAXIMUM_LENGTH = 6;
let W3mSocialLoginWidget = class W3mSocialLoginWidget2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.walletGuide = "get-started";
    this.tabIdx = void 0;
    this.connectors = ConnectorController.state.connectors;
    this.remoteFeatures = OptionsController.state.remoteFeatures;
    this.authConnector = this.connectors.find((c) => c.type === "AUTH");
    this.isPwaLoading = false;
    this.hasExceededUsageLimit = ApiController.state.plan.hasExceededUsageLimit;
    this.unsubscribe.push(ConnectorController.subscribeKey("connectors", (val) => {
      this.connectors = val;
      this.authConnector = this.connectors.find((c) => c.type === "AUTH");
    }), OptionsController.subscribeKey("remoteFeatures", (val) => this.remoteFeatures = val), ApiController.subscribeKey("plan", (val) => this.hasExceededUsageLimit = val.hasExceededUsageLimit));
  }
  connectedCallback() {
    super.connectedCallback();
    this.handlePwaFrameLoad();
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    return T`
      <wui-flex
        class="container"
        flexDirection="column"
        gap="2"
        data-testid="w3m-social-login-widget"
      >
        ${this.topViewTemplate()}${this.bottomViewTemplate()}
      </wui-flex>
    `;
  }
  topViewTemplate() {
    const isCreateWalletPage = this.walletGuide === "explore";
    let socials2 = this.remoteFeatures?.socials;
    if (!socials2 && isCreateWalletPage) {
      socials2 = ConstantsUtil$2.DEFAULT_SOCIALS;
      return this.renderTopViewContent(socials2);
    }
    if (!socials2) {
      return null;
    }
    return this.renderTopViewContent(socials2);
  }
  renderTopViewContent(socials2) {
    if (socials2.length === 2) {
      return T` <wui-flex gap="2">
        ${socials2.slice(0, MAX_TOP_VIEW).map((social) => T`<wui-logo-select
              data-testid=${`social-selector-${social}`}
              @click=${() => {
        this.onSocialClick(social);
      }}
              logo=${social}
              tabIdx=${o(this.tabIdx)}
              ?disabled=${this.isPwaLoading || this.hasConnection()}
            ></wui-logo-select>`)}
      </wui-flex>`;
    }
    return T` <wui-list-button
      data-testid=${`social-selector-${socials2[0]}`}
      @click=${() => {
      this.onSocialClick(socials2[0]);
    }}
      size="lg"
      icon=${o(socials2[0])}
      text=${`Continue with ${UiHelperUtil.capitalize(socials2[0])}`}
      tabIdx=${o(this.tabIdx)}
      ?disabled=${this.isPwaLoading || this.hasConnection()}
    ></wui-list-button>`;
  }
  bottomViewTemplate() {
    let socials2 = this.remoteFeatures?.socials;
    const isCreateWalletPage = this.walletGuide === "explore";
    const isSocialDisabled = !this.authConnector || !socials2 || socials2.length === 0;
    if (isSocialDisabled && isCreateWalletPage) {
      socials2 = ConstantsUtil$2.DEFAULT_SOCIALS;
    }
    if (!socials2) {
      return null;
    }
    if (socials2.length <= MAX_TOP_VIEW) {
      return null;
    }
    if (socials2 && socials2.length > MAXIMUM_LENGTH) {
      return T`<wui-flex gap="2">
        ${socials2.slice(1, MAXIMUM_LENGTH - 1).map((social) => T`<wui-logo-select
              data-testid=${`social-selector-${social}`}
              @click=${() => {
        this.onSocialClick(social);
      }}
              logo=${social}
              tabIdx=${o(this.tabIdx)}
              ?focusable=${this.tabIdx !== void 0 && this.tabIdx >= 0}
              ?disabled=${this.isPwaLoading || this.hasConnection()}
            ></wui-logo-select>`)}
        <wui-logo-select
          logo="more"
          tabIdx=${o(this.tabIdx)}
          @click=${this.onMoreSocialsClick.bind(this)}
          ?disabled=${this.isPwaLoading || this.hasConnection()}
          data-testid="social-selector-more"
        ></wui-logo-select>
      </wui-flex>`;
    }
    if (!socials2) {
      return null;
    }
    return T`<wui-flex gap="2">
      ${socials2.slice(1, socials2.length).map((social) => T`<wui-logo-select
            data-testid=${`social-selector-${social}`}
            @click=${() => {
      this.onSocialClick(social);
    }}
            logo=${social}
            tabIdx=${o(this.tabIdx)}
            ?focusable=${this.tabIdx !== void 0 && this.tabIdx >= 0}
            ?disabled=${this.isPwaLoading || this.hasConnection()}
          ></wui-logo-select>`)}
    </wui-flex>`;
  }
  onMoreSocialsClick() {
    RouterController.push("ConnectSocials");
  }
  async onSocialClick(socialProvider) {
    if (this.hasExceededUsageLimit) {
      RouterController.push("UsageExceeded");
      return;
    }
    const isAvailableChain = ConstantsUtil$1.AUTH_CONNECTOR_SUPPORTED_CHAINS.find((chain) => chain === ChainController.state.activeChain);
    if (!isAvailableChain) {
      const caipNetwork = ChainController.getFirstCaipNetworkSupportsAuthConnector();
      if (caipNetwork) {
        RouterController.push("SwitchNetwork", { network: caipNetwork });
        return;
      }
    }
    if (socialProvider) {
      await executeSocialLogin(socialProvider);
    }
  }
  async handlePwaFrameLoad() {
    if (CoreHelperUtil.isPWA()) {
      this.isPwaLoading = true;
      try {
        if (this.authConnector?.provider instanceof W3mFrameProvider) {
          await this.authConnector.provider.init();
        }
      } catch (error) {
        AlertController.open({
          displayMessage: "Error loading embedded wallet in PWA",
          debugMessage: error.message
        }, "error");
      } finally {
        this.isPwaLoading = false;
      }
    }
  }
  hasConnection() {
    return ConnectionController.hasAnyConnection(ConstantsUtil$1.CONNECTOR_ID.AUTH);
  }
};
W3mSocialLoginWidget.styles = styles$X;
__decorate$1l([
  n()
], W3mSocialLoginWidget.prototype, "walletGuide", void 0);
__decorate$1l([
  n()
], W3mSocialLoginWidget.prototype, "tabIdx", void 0);
__decorate$1l([
  r()
], W3mSocialLoginWidget.prototype, "connectors", void 0);
__decorate$1l([
  r()
], W3mSocialLoginWidget.prototype, "remoteFeatures", void 0);
__decorate$1l([
  r()
], W3mSocialLoginWidget.prototype, "authConnector", void 0);
__decorate$1l([
  r()
], W3mSocialLoginWidget.prototype, "isPwaLoading", void 0);
__decorate$1l([
  r()
], W3mSocialLoginWidget.prototype, "hasExceededUsageLimit", void 0);
W3mSocialLoginWidget = __decorate$1l([
  customElement("w3m-social-login-widget")
], W3mSocialLoginWidget);
var __decorate$1k = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mAllWalletsWidget = class W3mAllWalletsWidget2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.tabIdx = void 0;
    this.connectors = ConnectorController.state.connectors;
    this.count = ApiController.state.count;
    this.filteredCount = ApiController.state.filteredWallets.length;
    this.isFetchingRecommendedWallets = ApiController.state.isFetchingRecommendedWallets;
    this.unsubscribe.push(ConnectorController.subscribeKey("connectors", (val) => this.connectors = val), ApiController.subscribeKey("count", (val) => this.count = val), ApiController.subscribeKey("filteredWallets", (val) => this.filteredCount = val.length), ApiController.subscribeKey("isFetchingRecommendedWallets", (val) => this.isFetchingRecommendedWallets = val));
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    const wcConnector = this.connectors.find((c) => c.id === "walletConnect");
    const { allWallets } = OptionsController.state;
    if (!wcConnector || allWallets === "HIDE") {
      return null;
    }
    if (allWallets === "ONLY_MOBILE" && !CoreHelperUtil.isMobile()) {
      return null;
    }
    const featuredCount = ApiController.state.featured.length;
    const rawCount = this.count + featuredCount;
    const roundedCount = rawCount < 10 ? rawCount : Math.floor(rawCount / 10) * 10;
    const count = this.filteredCount > 0 ? this.filteredCount : roundedCount;
    let tagLabel = `${count}`;
    if (this.filteredCount > 0) {
      tagLabel = `${this.filteredCount}`;
    } else if (count < rawCount) {
      tagLabel = `${count}+`;
    }
    const hasWcConnection = ConnectionController.hasAnyConnection(ConstantsUtil$1.CONNECTOR_ID.WALLET_CONNECT);
    return T`
      <wui-list-wallet
        name="Search Wallet"
        walletIcon="search"
        showAllWallets
        @click=${this.onAllWallets.bind(this)}
        tagLabel=${tagLabel}
        tagVariant="info"
        data-testid="all-wallets"
        tabIdx=${o(this.tabIdx)}
        .loading=${this.isFetchingRecommendedWallets}
        ?disabled=${hasWcConnection}
        size="sm"
      ></wui-list-wallet>
    `;
  }
  onAllWallets() {
    EventsController.sendEvent({ type: "track", event: "CLICK_ALL_WALLETS" });
    RouterController.push("AllWallets", { redirectView: RouterController.state.data?.redirectView });
  }
};
__decorate$1k([
  n()
], W3mAllWalletsWidget.prototype, "tabIdx", void 0);
__decorate$1k([
  r()
], W3mAllWalletsWidget.prototype, "connectors", void 0);
__decorate$1k([
  r()
], W3mAllWalletsWidget.prototype, "count", void 0);
__decorate$1k([
  r()
], W3mAllWalletsWidget.prototype, "filteredCount", void 0);
__decorate$1k([
  r()
], W3mAllWalletsWidget.prototype, "isFetchingRecommendedWallets", void 0);
W3mAllWalletsWidget = __decorate$1k([
  customElement("w3m-all-wallets-widget")
], W3mAllWalletsWidget);
const styles$W = css`
  :host {
    margin-top: ${({ spacing }) => spacing["1"]};
  }
  wui-separator {
    margin: ${({ spacing }) => spacing["3"]} calc(${({ spacing }) => spacing["3"]} * -1)
      ${({ spacing }) => spacing["2"]} calc(${({ spacing }) => spacing["3"]} * -1);
    width: calc(100% + ${({ spacing }) => spacing["3"]} * 2);
  }
`;
var __decorate$1j = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mConnectorList = class W3mConnectorList2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.explorerWallets = ApiController.state.explorerWallets;
    this.connections = ConnectionController.state.connections;
    this.connectorImages = AssetController.state.connectorImages;
    this.loadingTelegram = false;
    this.unsubscribe.push(ConnectionController.subscribeKey("connections", (val) => this.connections = val), AssetController.subscribeKey("connectorImages", (val) => this.connectorImages = val), ApiController.subscribeKey("explorerFilteredWallets", (val) => {
      this.explorerWallets = val?.length ? val : ApiController.state.explorerWallets;
    }), ApiController.subscribeKey("explorerWallets", (val) => {
      if (!this.explorerWallets?.length) {
        this.explorerWallets = val;
      }
    }));
    if (CoreHelperUtil.isTelegram() && CoreHelperUtil.isIos()) {
      this.loadingTelegram = !ConnectionController.state.wcUri;
      this.unsubscribe.push(ConnectionController.subscribeKey("wcUri", (val) => this.loadingTelegram = !val));
    }
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    return T`
      <wui-flex flexDirection="column" gap="2"> ${this.connectorListTemplate()} </wui-flex>
    `;
  }
  connectorListTemplate() {
    return ConnectorUtil.connectorList().map((item, displayIndex) => {
      if (item.kind === "connector") {
        return this.renderConnector(item, displayIndex);
      }
      return this.renderWallet(item, displayIndex);
    });
  }
  getConnectorNamespaces(item) {
    if (item.subtype === "walletConnect") {
      return [];
    }
    if (item.subtype === "multiChain") {
      return item.connector.connectors?.map((c) => c.chain) || [];
    }
    return [item.connector.chain];
  }
  renderConnector(item, index2) {
    const connector = item.connector;
    const imageSrc = AssetUtil.getConnectorImage(connector) || this.connectorImages[connector?.imageId ?? ""];
    const connectionsByNamespace = this.connections.get(connector.chain) ?? [];
    const isAlreadyConnected = connectionsByNamespace.some((c) => HelpersUtil$1.isLowerCaseMatch(c.connectorId, connector.id));
    let tagLabel = void 0;
    let tagVariant = void 0;
    if (item.subtype === "walletConnect") {
      tagLabel = "qr code";
      tagVariant = "accent";
    } else if (item.subtype === "injected" || item.subtype === "announced") {
      tagLabel = isAlreadyConnected ? "connected" : "installed";
      tagVariant = isAlreadyConnected ? "info" : "success";
    } else {
      tagLabel = void 0;
      tagVariant = void 0;
    }
    const hasWcConnection = ConnectionController.hasAnyConnection(ConstantsUtil$1.CONNECTOR_ID.WALLET_CONNECT);
    const disabled = item.subtype === "walletConnect" || item.subtype === "external" ? hasWcConnection : false;
    return T`
      <w3m-list-wallet
        displayIndex=${index2}
        imageSrc=${o(imageSrc)}
        .installed=${true}
        name=${connector.name ?? "Unknown"}
        .tagVariant=${tagVariant}
        tagLabel=${o(tagLabel)}
        data-testid=${`wallet-selector-${connector.id.toLowerCase()}`}
        size="sm"
        @click=${() => this.onClickConnector(item)}
        tabIdx=${o(this.tabIdx)}
        ?disabled=${disabled}
        rdnsId=${o(connector.explorerWallet?.rdns || void 0)}
        walletRank=${o(connector.explorerWallet?.order)}
        .namespaces=${this.getConnectorNamespaces(item)}
      >
      </w3m-list-wallet>
    `;
  }
  onClickConnector(item) {
    const redirectView = RouterController.state.data?.redirectView;
    if (item.subtype === "walletConnect") {
      ConnectorController.setActiveConnector(item.connector);
      if (CoreHelperUtil.isMobile()) {
        RouterController.push("AllWallets");
      } else {
        RouterController.push("ConnectingWalletConnect", { redirectView });
      }
      return;
    }
    if (item.subtype === "multiChain") {
      ConnectorController.setActiveConnector(item.connector);
      RouterController.push("ConnectingMultiChain", { redirectView });
      return;
    }
    if (item.subtype === "injected") {
      ConnectorController.setActiveConnector(item.connector);
      RouterController.push("ConnectingExternal", {
        connector: item.connector,
        redirectView,
        wallet: item.connector.explorerWallet
      });
      return;
    }
    if (item.subtype === "announced") {
      if (item.connector.id === "walletConnect") {
        if (CoreHelperUtil.isMobile()) {
          RouterController.push("AllWallets");
        } else {
          RouterController.push("ConnectingWalletConnect", { redirectView });
        }
        return;
      }
      RouterController.push("ConnectingExternal", {
        connector: item.connector,
        redirectView,
        wallet: item.connector.explorerWallet
      });
      return;
    }
    RouterController.push("ConnectingExternal", {
      connector: item.connector,
      redirectView
    });
  }
  renderWallet(item, index2) {
    const wallet = item.wallet;
    const imageSrc = AssetUtil.getWalletImage(wallet);
    const hasWcConnection = ConnectionController.hasAnyConnection(ConstantsUtil$1.CONNECTOR_ID.WALLET_CONNECT);
    const disabled = hasWcConnection;
    const loading = this.loadingTelegram;
    const tagLabel = item.subtype === "recent" ? "recent" : void 0;
    const tagVariant = item.subtype === "recent" ? "info" : void 0;
    return T`
      <w3m-list-wallet
        displayIndex=${index2}
        imageSrc=${o(imageSrc)}
        name=${wallet.name ?? "Unknown"}
        @click=${() => this.onClickWallet(item)}
        size="sm"
        data-testid=${`wallet-selector-${wallet.id}`}
        tabIdx=${o(this.tabIdx)}
        ?loading=${loading}
        ?disabled=${disabled}
        rdnsId=${o(wallet.rdns || void 0)}
        walletRank=${o(wallet.order)}
        tagLabel=${o(tagLabel)}
        .tagVariant=${tagVariant}
      >
      </w3m-list-wallet>
    `;
  }
  onClickWallet(item) {
    const redirectView = RouterController.state.data?.redirectView;
    const namespace = ChainController.state.activeChain;
    if (item.subtype === "featured") {
      ConnectorController.selectWalletConnector(item.wallet);
      return;
    }
    if (item.subtype === "recent") {
      if (this.loadingTelegram) {
        return;
      }
      ConnectorController.selectWalletConnector(item.wallet);
      return;
    }
    if (item.subtype === "custom") {
      if (this.loadingTelegram) {
        return;
      }
      RouterController.push("ConnectingWalletConnect", { wallet: item.wallet, redirectView });
      return;
    }
    if (this.loadingTelegram) {
      return;
    }
    const connector = namespace ? ConnectorController.getConnector({ id: item.wallet.id, namespace }) : void 0;
    if (connector) {
      RouterController.push("ConnectingExternal", { connector, redirectView });
    } else {
      RouterController.push("ConnectingWalletConnect", { wallet: item.wallet, redirectView });
    }
  }
};
W3mConnectorList.styles = styles$W;
__decorate$1j([
  n({ type: Number })
], W3mConnectorList.prototype, "tabIdx", void 0);
__decorate$1j([
  r()
], W3mConnectorList.prototype, "explorerWallets", void 0);
__decorate$1j([
  r()
], W3mConnectorList.prototype, "connections", void 0);
__decorate$1j([
  r()
], W3mConnectorList.prototype, "connectorImages", void 0);
__decorate$1j([
  r()
], W3mConnectorList.prototype, "loadingTelegram", void 0);
W3mConnectorList = __decorate$1j([
  customElement("w3m-connector-list")
], W3mConnectorList);
var __decorate$1i = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mWalletLoginList = class W3mWalletLoginList2 extends i {
  constructor() {
    super(...arguments);
    this.tabIdx = void 0;
  }
  render() {
    return T`
      <wui-flex flexDirection="column" gap="2">
        <w3m-connector-list tabIdx=${o(this.tabIdx)}></w3m-connector-list>
        <w3m-all-wallets-widget tabIdx=${o(this.tabIdx)}></w3m-all-wallets-widget>
      </wui-flex>
    `;
  }
};
__decorate$1i([
  n()
], W3mWalletLoginList.prototype, "tabIdx", void 0);
W3mWalletLoginList = __decorate$1i([
  customElement("w3m-wallet-login-list")
], W3mWalletLoginList);
const styles$V = css`
  :host {
    --connect-scroll--top-opacity: 0;
    --connect-scroll--bottom-opacity: 0;
    --connect-mask-image: none;
  }

  .connect {
    max-height: clamp(360px, 470px, 80vh);
    scrollbar-width: none;
    overflow-y: scroll;
    overflow-x: hidden;
    transition: opacity ${({ durations }) => durations["lg"]}
      ${({ easings }) => easings["ease-out-power-2"]};
    will-change: opacity;
    mask-image: var(--connect-mask-image);
  }

  .guide {
    transition: opacity ${({ durations }) => durations["lg"]}
      ${({ easings }) => easings["ease-out-power-2"]};
    will-change: opacity;
  }

  .connect::-webkit-scrollbar {
    display: none;
  }

  .all-wallets {
    flex-flow: column;
  }

  .connect.disabled,
  .guide.disabled {
    opacity: 0.3;
    pointer-events: none;
    user-select: none;
  }

  wui-separator {
    margin: ${({ spacing }) => spacing["3"]} calc(${({ spacing }) => spacing["3"]} * -1);
    width: calc(100% + ${({ spacing }) => spacing["3"]} * 2);
  }
`;
var __decorate$1h = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
const SCROLL_THRESHOLD = 470;
let W3mConnectView = class W3mConnectView2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.connectors = ConnectorController.state.connectors;
    this.authConnector = this.connectors.find((c) => c.type === "AUTH");
    this.features = OptionsController.state.features;
    this.remoteFeatures = OptionsController.state.remoteFeatures;
    this.enableWallets = OptionsController.state.enableWallets;
    this.noAdapters = ChainController.state.noAdapters;
    this.walletGuide = "get-started";
    this.checked = OptionsStateController.state.isLegalCheckboxChecked;
    this.isEmailEnabled = this.remoteFeatures?.email && !ChainController.state.noAdapters;
    this.isSocialEnabled = this.remoteFeatures?.socials && this.remoteFeatures.socials.length > 0 && !ChainController.state.noAdapters;
    this.isAuthEnabled = this.checkIfAuthEnabled(this.connectors);
    this.unsubscribe.push(ConnectorController.subscribeKey("connectors", (val) => {
      this.connectors = val;
      this.authConnector = this.connectors.find((c) => c.type === "AUTH");
      this.isAuthEnabled = this.checkIfAuthEnabled(this.connectors);
    }), OptionsController.subscribeKey("features", (val) => {
      this.features = val;
    }), OptionsController.subscribeKey("remoteFeatures", (val) => {
      this.remoteFeatures = val;
      this.setEmailAndSocialEnableCheck(this.noAdapters, this.remoteFeatures);
    }), OptionsController.subscribeKey("enableWallets", (val) => this.enableWallets = val), ChainController.subscribeKey("noAdapters", (val) => this.setEmailAndSocialEnableCheck(val, this.remoteFeatures)), OptionsStateController.subscribeKey("isLegalCheckboxChecked", (val) => this.checked = val));
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
    this.resizeObserver?.disconnect();
    const connectEl = this.shadowRoot?.querySelector(".connect");
    connectEl?.removeEventListener("scroll", this.handleConnectListScroll.bind(this));
  }
  firstUpdated() {
    const connectEl = this.shadowRoot?.querySelector(".connect");
    if (connectEl) {
      requestAnimationFrame(this.handleConnectListScroll.bind(this));
      connectEl?.addEventListener("scroll", this.handleConnectListScroll.bind(this));
      this.resizeObserver = new ResizeObserver(() => {
        this.handleConnectListScroll();
      });
      this.resizeObserver?.observe(connectEl);
      this.handleConnectListScroll();
    }
  }
  render() {
    const { termsConditionsUrl, privacyPolicyUrl } = OptionsController.state;
    const isLegalCheckbox = OptionsController.state.features?.legalCheckbox;
    const legalUrl = termsConditionsUrl || privacyPolicyUrl;
    const isShowLegalCheckbox = Boolean(legalUrl) && Boolean(isLegalCheckbox) && this.walletGuide === "get-started";
    const isDisabled = isShowLegalCheckbox && !this.checked;
    const classes = {
      connect: true,
      disabled: isDisabled
    };
    const isEnableWalletGuide = OptionsController.state.enableWalletGuide;
    const isEnableWallets = this.enableWallets;
    const socialOrEmailLoginEnabled = this.isSocialEnabled || this.authConnector;
    const tabIndex = isDisabled ? -1 : void 0;
    return T`
      <wui-flex flexDirection="column">
        ${this.legalCheckboxTemplate()}
        <wui-flex
          data-testid="w3m-connect-scroll-view"
          flexDirection="column"
          .padding=${["0", "0", "4", "0"]}
          class=${e(classes)}
        >
          <wui-flex
            class="connect-methods"
            flexDirection="column"
            gap="2"
            .padding=${socialOrEmailLoginEnabled && isEnableWallets && isEnableWalletGuide && this.walletGuide === "get-started" ? ["0", "3", "0", "3"] : ["0", "3", "3", "3"]}
          >
            ${this.renderConnectMethod(tabIndex)}
          </wui-flex>
        </wui-flex>
        ${this.reownBrandingTemplate()}
      </wui-flex>
    `;
  }
  reownBrandingTemplate() {
    if (HelpersUtil.hasFooter()) {
      return null;
    }
    if (!this.remoteFeatures?.reownBranding) {
      return null;
    }
    return T`<wui-ux-by-reown></wui-ux-by-reown>`;
  }
  setEmailAndSocialEnableCheck(noAdapters, remoteFeatures) {
    this.isEmailEnabled = remoteFeatures?.email && !noAdapters;
    this.isSocialEnabled = remoteFeatures?.socials && remoteFeatures.socials.length > 0 && !noAdapters;
    this.remoteFeatures = remoteFeatures;
    this.noAdapters = noAdapters;
  }
  checkIfAuthEnabled(connectors) {
    const namespacesWithAuthConnector = connectors.filter((c) => c.type === ConstantsUtil$3.CONNECTOR_TYPE_AUTH).map((i2) => i2.chain);
    const authSupportedNamespaces = ConstantsUtil$1.AUTH_CONNECTOR_SUPPORTED_CHAINS;
    return authSupportedNamespaces.some((ns) => namespacesWithAuthConnector.includes(ns));
  }
  renderConnectMethod(tabIndex) {
    const connectMethodsOrder = WalletUtil.getConnectOrderMethod(this.features, this.connectors);
    return T`${connectMethodsOrder.map((method, index2) => {
      switch (method) {
        case "email":
          return T`${this.emailTemplate(tabIndex)} ${this.separatorTemplate(index2, "email")}`;
        case "social":
          return T`${this.socialListTemplate(tabIndex)}
          ${this.separatorTemplate(index2, "social")}`;
        case "wallet":
          return T`${this.walletListTemplate(tabIndex)}
          ${this.separatorTemplate(index2, "wallet")}`;
        default:
          return null;
      }
    })}`;
  }
  checkMethodEnabled(name) {
    switch (name) {
      case "wallet":
        return this.enableWallets;
      case "social":
        return this.isSocialEnabled && this.isAuthEnabled;
      case "email":
        return this.isEmailEnabled && this.isAuthEnabled;
      default:
        return null;
    }
  }
  checkIsThereNextMethod(currentIndex) {
    const connectMethodsOrder = WalletUtil.getConnectOrderMethod(this.features, this.connectors);
    const nextMethod = connectMethodsOrder[currentIndex + 1];
    if (!nextMethod) {
      return void 0;
    }
    const isNextMethodEnabled = this.checkMethodEnabled(nextMethod);
    if (isNextMethodEnabled) {
      return nextMethod;
    }
    return this.checkIsThereNextMethod(currentIndex + 1);
  }
  separatorTemplate(index2, type) {
    const nextEnabledMethod = this.checkIsThereNextMethod(index2);
    const isExplore = this.walletGuide === "explore";
    switch (type) {
      case "wallet": {
        const isWalletEnable = this.enableWallets;
        return isWalletEnable && nextEnabledMethod && !isExplore ? T`<wui-separator data-testid="wui-separator" text="or"></wui-separator>` : null;
      }
      case "email": {
        const isNextMethodSocial = nextEnabledMethod === "social";
        return this.isAuthEnabled && this.isEmailEnabled && !isNextMethodSocial && nextEnabledMethod ? T`<wui-separator
              data-testid="w3m-email-login-or-separator"
              text="or"
            ></wui-separator>` : null;
      }
      case "social": {
        const isNextMethodEmail = nextEnabledMethod === "email";
        return this.isAuthEnabled && this.isSocialEnabled && !isNextMethodEmail && nextEnabledMethod ? T`<wui-separator data-testid="wui-separator" text="or"></wui-separator>` : null;
      }
      default:
        return null;
    }
  }
  emailTemplate(tabIndex) {
    if (!this.isEmailEnabled || !this.isAuthEnabled) {
      return null;
    }
    return T`<w3m-email-login-widget tabIdx=${o(tabIndex)}></w3m-email-login-widget>`;
  }
  socialListTemplate(tabIndex) {
    if (!this.isSocialEnabled || !this.isAuthEnabled) {
      return null;
    }
    return T`<w3m-social-login-widget
      walletGuide=${this.walletGuide}
      tabIdx=${o(tabIndex)}
    ></w3m-social-login-widget>`;
  }
  walletListTemplate(tabIndex) {
    const isEnableWallets = this.enableWallets;
    const isCollapseWalletsOldProp = this.features?.emailShowWallets === false;
    const isCollapseWallets = this.features?.collapseWallets;
    const shouldCollapseWallets = isCollapseWalletsOldProp || isCollapseWallets;
    if (!isEnableWallets) {
      return null;
    }
    if (CoreHelperUtil.isTelegram() && (CoreHelperUtil.isSafari() || CoreHelperUtil.isIos())) {
      ConnectionController.connectWalletConnect().catch((_e) => ({}));
    }
    if (this.walletGuide === "explore") {
      return null;
    }
    const hasOtherMethods = this.isAuthEnabled && (this.isEmailEnabled || this.isSocialEnabled);
    if (hasOtherMethods && shouldCollapseWallets) {
      return T`<wui-list-button
        data-testid="w3m-collapse-wallets-button"
        tabIdx=${o(tabIndex)}
        @click=${this.onContinueWalletClick.bind(this)}
        text="Continue with a wallet"
        icon="wallet"
      ></wui-list-button>`;
    }
    return T`<w3m-wallet-login-list tabIdx=${o(tabIndex)}></w3m-wallet-login-list>`;
  }
  legalCheckboxTemplate() {
    if (this.walletGuide === "explore") {
      return null;
    }
    return T`<w3m-legal-checkbox data-testid="w3m-legal-checkbox"></w3m-legal-checkbox>`;
  }
  handleConnectListScroll() {
    const connectEl = this.shadowRoot?.querySelector(".connect");
    if (!connectEl) {
      return;
    }
    const shouldApplyMask = connectEl.scrollHeight > SCROLL_THRESHOLD;
    if (shouldApplyMask) {
      connectEl.style.setProperty("--connect-mask-image", `linear-gradient(
          to bottom,
          rgba(0, 0, 0, calc(1 - var(--connect-scroll--top-opacity))) 0px,
          rgba(200, 200, 200, calc(1 - var(--connect-scroll--top-opacity))) 1px,
          black 100px,
          black calc(100% - 100px),
          rgba(155, 155, 155, calc(1 - var(--connect-scroll--bottom-opacity))) calc(100% - 1px),
          rgba(0, 0, 0, calc(1 - var(--connect-scroll--bottom-opacity))) 100%
        )`);
      connectEl.style.setProperty("--connect-scroll--top-opacity", MathUtil.interpolate([0, 50], [0, 1], connectEl.scrollTop).toString());
      connectEl.style.setProperty("--connect-scroll--bottom-opacity", MathUtil.interpolate([0, 50], [0, 1], connectEl.scrollHeight - connectEl.scrollTop - connectEl.offsetHeight).toString());
    } else {
      connectEl.style.setProperty("--connect-mask-image", "none");
      connectEl.style.setProperty("--connect-scroll--top-opacity", "0");
      connectEl.style.setProperty("--connect-scroll--bottom-opacity", "0");
    }
  }
  onContinueWalletClick() {
    RouterController.push("ConnectWallets");
  }
};
W3mConnectView.styles = styles$V;
__decorate$1h([
  r()
], W3mConnectView.prototype, "connectors", void 0);
__decorate$1h([
  r()
], W3mConnectView.prototype, "authConnector", void 0);
__decorate$1h([
  r()
], W3mConnectView.prototype, "features", void 0);
__decorate$1h([
  r()
], W3mConnectView.prototype, "remoteFeatures", void 0);
__decorate$1h([
  r()
], W3mConnectView.prototype, "enableWallets", void 0);
__decorate$1h([
  r()
], W3mConnectView.prototype, "noAdapters", void 0);
__decorate$1h([
  n()
], W3mConnectView.prototype, "walletGuide", void 0);
__decorate$1h([
  r()
], W3mConnectView.prototype, "checked", void 0);
__decorate$1h([
  r()
], W3mConnectView.prototype, "isEmailEnabled", void 0);
__decorate$1h([
  r()
], W3mConnectView.prototype, "isSocialEnabled", void 0);
__decorate$1h([
  r()
], W3mConnectView.prototype, "isAuthEnabled", void 0);
W3mConnectView = __decorate$1h([
  customElement("w3m-connect-view")
], W3mConnectView);
const styles$U = css`
  :host {
    display: block;
    padding: 0 ${({ spacing }) => spacing["5"]} ${({ spacing }) => spacing["5"]};
  }
`;
var __decorate$1g = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mMobileDownloadLinks = class W3mMobileDownloadLinks2 extends i {
  constructor() {
    super(...arguments);
    this.wallet = void 0;
  }
  render() {
    if (!this.wallet) {
      this.style.display = "none";
      return null;
    }
    const { name, app_store, play_store, chrome_store, homepage } = this.wallet;
    const isMobile = CoreHelperUtil.isMobile();
    const isIos = CoreHelperUtil.isIos();
    const isAndroid = CoreHelperUtil.isAndroid();
    const isMultiple = [app_store, play_store, homepage, chrome_store].filter(Boolean).length > 1;
    const shortName = UiHelperUtil.getTruncateString({
      string: name,
      charsStart: 12,
      charsEnd: 0,
      truncate: "end"
    });
    if (isMultiple && !isMobile) {
      return T`
        <wui-cta-button
          label=${`Don't have ${shortName}?`}
          buttonLabel="Get"
          @click=${() => RouterController.push("Downloads", { wallet: this.wallet })}
        ></wui-cta-button>
      `;
    }
    if (!isMultiple && homepage) {
      return T`
        <wui-cta-button
          label=${`Don't have ${shortName}?`}
          buttonLabel="Get"
          @click=${this.onHomePage.bind(this)}
        ></wui-cta-button>
      `;
    }
    if (app_store && isIos) {
      return T`
        <wui-cta-button
          label=${`Don't have ${shortName}?`}
          buttonLabel="Get"
          @click=${this.onAppStore.bind(this)}
        ></wui-cta-button>
      `;
    }
    if (play_store && isAndroid) {
      return T`
        <wui-cta-button
          label=${`Don't have ${shortName}?`}
          buttonLabel="Get"
          @click=${this.onPlayStore.bind(this)}
        ></wui-cta-button>
      `;
    }
    this.style.display = "none";
    return null;
  }
  onAppStore() {
    if (this.wallet?.app_store) {
      CoreHelperUtil.openHref(this.wallet.app_store, "_blank");
    }
  }
  onPlayStore() {
    if (this.wallet?.play_store) {
      CoreHelperUtil.openHref(this.wallet.play_store, "_blank");
    }
  }
  onHomePage() {
    if (this.wallet?.homepage) {
      CoreHelperUtil.openHref(this.wallet.homepage, "_blank");
    }
  }
};
W3mMobileDownloadLinks.styles = [styles$U];
__decorate$1g([
  n({ type: Object })
], W3mMobileDownloadLinks.prototype, "wallet", void 0);
W3mMobileDownloadLinks = __decorate$1g([
  customElement("w3m-mobile-download-links")
], W3mMobileDownloadLinks);
const styles$T = css`
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-wallet-image {
    width: 56px;
    height: 56px;
  }

  wui-loading-thumbnail {
    position: absolute;
  }

  wui-icon-box {
    position: absolute;
    right: calc(${({ spacing }) => spacing["1"]} * -1);
    bottom: calc(${({ spacing }) => spacing["1"]} * -1);
    opacity: 0;
    transform: scale(0.5);
    transition-property: opacity, transform;
    transition-duration: ${({ durations }) => durations["lg"]};
    transition-timing-function: ${({ easings }) => easings["ease-out-power-2"]};
    will-change: opacity, transform;
  }

  wui-text[align='center'] {
    width: 100%;
    padding: 0px ${({ spacing }) => spacing["4"]};
  }

  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }

  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms ${({ easings }) => easings["ease-out-power-2"]} both;
  }

  [data-retry='false'] wui-link {
    display: none;
  }

  [data-retry='true'] wui-link {
    display: block;
    opacity: 1;
  }

  w3m-mobile-download-links {
    padding: 0px;
    width: 100%;
  }
`;
var __decorate$1f = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
class W3mConnectingWidget extends i {
  constructor() {
    super();
    this.wallet = RouterController.state.data?.wallet;
    this.connector = RouterController.state.data?.connector;
    this.timeout = void 0;
    this.secondaryBtnIcon = "refresh";
    this.onConnect = void 0;
    this.onRender = void 0;
    this.onAutoConnect = void 0;
    this.isWalletConnect = true;
    this.unsubscribe = [];
    this.imageSrc = AssetUtil.getConnectorImage(this.connector) ?? AssetUtil.getWalletImage(this.wallet);
    this.name = this.wallet?.name ?? this.connector?.name ?? "Wallet";
    this.isRetrying = false;
    this.uri = ConnectionController.state.wcUri;
    this.error = ConnectionController.state.wcError;
    this.ready = false;
    this.showRetry = false;
    this.label = void 0;
    this.secondaryBtnLabel = "Try again";
    this.secondaryLabel = "Accept connection request in the wallet";
    this.isLoading = false;
    this.isMobile = false;
    this.onRetry = void 0;
    this.unsubscribe.push(...[
      ConnectionController.subscribeKey("wcUri", (val) => {
        this.uri = val;
        if (this.isRetrying && this.onRetry) {
          this.isRetrying = false;
          this.onConnect?.();
        }
      }),
      ConnectionController.subscribeKey("wcError", (val) => this.error = val)
    ]);
    if ((CoreHelperUtil.isTelegram() || CoreHelperUtil.isSafari()) && CoreHelperUtil.isIos() && ConnectionController.state.wcUri) {
      this.onConnect?.();
    }
  }
  firstUpdated() {
    this.onAutoConnect?.();
    this.showRetry = !this.onAutoConnect;
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
    ConnectionController.setWcError(false);
    clearTimeout(this.timeout);
  }
  render() {
    this.onRender?.();
    this.onShowRetry();
    const subLabel = this.error ? "Connection can be declined if a previous request is still active" : this.secondaryLabel;
    let label = "";
    if (this.label) {
      label = this.label;
    } else {
      label = `Continue in ${this.name}`;
      if (this.error) {
        label = "Connection declined";
      }
    }
    return T`
      <wui-flex
        data-error=${o(this.error)}
        data-retry=${this.showRetry}
        flexDirection="column"
        alignItems="center"
        .padding=${["10", "5", "5", "5"]}
        gap="6"
      >
        <wui-flex gap="2" justifyContent="center" alignItems="center">
          <wui-wallet-image size="lg" imageSrc=${o(this.imageSrc)}></wui-wallet-image>

          ${this.error ? null : this.loaderTemplate()}

          <wui-icon-box
            color="error"
            icon="close"
            size="sm"
            border
            borderColor="wui-color-bg-125"
          ></wui-icon-box>
        </wui-flex>

        <wui-flex flexDirection="column" alignItems="center" gap="6"> <wui-flex
          flexDirection="column"
          alignItems="center"
          gap="2"
          .padding=${["2", "0", "0", "0"]}
        >
          <wui-text align="center" variant="lg-medium" color=${this.error ? "error" : "primary"}>
            ${label}
          </wui-text>
          <wui-text align="center" variant="lg-regular" color="secondary">${subLabel}</wui-text>
        </wui-flex>

        ${this.secondaryBtnLabel ? T`
                <wui-button
                  variant="neutral-secondary"
                  size="md"
                  ?disabled=${this.isRetrying || this.isLoading}
                  @click=${this.onTryAgain.bind(this)}
                  data-testid="w3m-connecting-widget-secondary-button"
                >
                  <wui-icon
                    color="inherit"
                    slot="iconLeft"
                    name=${this.secondaryBtnIcon}
                  ></wui-icon>
                  ${this.secondaryBtnLabel}
                </wui-button>
              ` : null}
      </wui-flex>

      ${this.isWalletConnect ? T`
              <wui-flex .padding=${["0", "5", "5", "5"]} justifyContent="center">
                <wui-link
                  @click=${this.onCopyUri}
                  variant="secondary"
                  icon="copy"
                  data-testid="wui-link-copy"
                >
                  Copy link
                </wui-link>
              </wui-flex>
            ` : null}

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links></wui-flex>
      </wui-flex>
    `;
  }
  onShowRetry() {
    if (this.error && !this.showRetry) {
      this.showRetry = true;
      const retryButton = this.shadowRoot?.querySelector("wui-button");
      retryButton?.animate([{ opacity: 0 }, { opacity: 1 }], {
        fill: "forwards",
        easing: "ease"
      });
    }
  }
  onTryAgain() {
    ConnectionController.setWcError(false);
    if (this.onRetry) {
      this.isRetrying = true;
      this.onRetry?.();
    } else {
      this.onConnect?.();
    }
  }
  loaderTemplate() {
    const borderRadiusMaster = ThemeController.state.themeVariables["--w3m-border-radius-master"];
    const radius = borderRadiusMaster ? parseInt(borderRadiusMaster.replace("px", ""), 10) : 4;
    return T`<wui-loading-thumbnail radius=${radius * 9}></wui-loading-thumbnail>`;
  }
  onCopyUri() {
    try {
      if (this.uri) {
        CoreHelperUtil.copyToClopboard(this.uri);
        SnackController.showSuccess("Link copied");
      }
    } catch {
      SnackController.showError("Failed to copy");
    }
  }
}
W3mConnectingWidget.styles = styles$T;
__decorate$1f([
  r()
], W3mConnectingWidget.prototype, "isRetrying", void 0);
__decorate$1f([
  r()
], W3mConnectingWidget.prototype, "uri", void 0);
__decorate$1f([
  r()
], W3mConnectingWidget.prototype, "error", void 0);
__decorate$1f([
  r()
], W3mConnectingWidget.prototype, "ready", void 0);
__decorate$1f([
  r()
], W3mConnectingWidget.prototype, "showRetry", void 0);
__decorate$1f([
  r()
], W3mConnectingWidget.prototype, "label", void 0);
__decorate$1f([
  r()
], W3mConnectingWidget.prototype, "secondaryBtnLabel", void 0);
__decorate$1f([
  r()
], W3mConnectingWidget.prototype, "secondaryLabel", void 0);
__decorate$1f([
  r()
], W3mConnectingWidget.prototype, "isLoading", void 0);
__decorate$1f([
  n({ type: Boolean })
], W3mConnectingWidget.prototype, "isMobile", void 0);
__decorate$1f([
  n()
], W3mConnectingWidget.prototype, "onRetry", void 0);
var __decorate$1e = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mConnectingExternalView = class W3mConnectingExternalView2 extends W3mConnectingWidget {
  constructor() {
    super();
    this.externalViewUnsubscribe = [];
    this.connectionsByNamespace = ConnectionController.getConnections(this.connector?.chain);
    this.hasMultipleConnections = this.connectionsByNamespace.length > 0;
    this.remoteFeatures = OptionsController.state.remoteFeatures;
    this.currentActiveConnectorId = ConnectorController.state.activeConnectorIds[this.connector?.chain];
    if (!this.connector) {
      throw new Error("w3m-connecting-view: No connector provided");
    }
    const namespace = this.connector?.chain;
    if (this.isAlreadyConnected(this.connector)) {
      this.secondaryBtnLabel = void 0;
      this.label = `This account is already linked, change your account in ${this.connector.name}`;
      this.secondaryLabel = `To link a new account, open ${this.connector.name} and switch to the account you want to link`;
    }
    EventsController.sendEvent({
      type: "track",
      event: "SELECT_WALLET",
      properties: {
        name: this.connector.name ?? "Unknown",
        platform: "browser",
        displayIndex: this.wallet?.display_index,
        walletRank: this.wallet?.order,
        view: RouterController.state.view
      }
    });
    this.onConnect = this.onConnectProxy.bind(this);
    this.onAutoConnect = this.onConnectProxy.bind(this);
    this.isWalletConnect = false;
    this.externalViewUnsubscribe.push(ConnectorController.subscribeKey("activeConnectorIds", (val) => {
      const newActiveConnectorId = val[namespace];
      const isMultiWalletEnabled = this.remoteFeatures?.multiWallet;
      const { redirectView } = RouterController.state.data ?? {};
      if (newActiveConnectorId !== this.currentActiveConnectorId) {
        if (this.hasMultipleConnections && isMultiWalletEnabled) {
          RouterController.replace("ProfileWallets");
          SnackController.showSuccess("New Wallet Added");
        } else if (redirectView) {
          RouterController.replace(redirectView);
        } else {
          ModalController.close();
        }
      }
    }), ConnectionController.subscribeKey("connections", this.onConnectionsChange.bind(this)));
  }
  disconnectedCallback() {
    this.externalViewUnsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  async onConnectProxy() {
    try {
      this.error = false;
      if (this.connector) {
        if (this.isAlreadyConnected(this.connector)) {
          return;
        }
        const isPopupBasedConnector = this.connector.id === ConstantsUtil$1.CONNECTOR_ID.COINBASE_SDK || this.connector.id === ConstantsUtil$1.CONNECTOR_ID.BASE_ACCOUNT;
        if (!isPopupBasedConnector || !this.error) {
          await ConnectionController.connectExternal(this.connector, this.connector.chain);
        }
      }
    } catch (error) {
      const isUserRejectedRequestError = error instanceof AppKitError && error.originalName === ErrorUtil$1.PROVIDER_RPC_ERROR_NAME.USER_REJECTED_REQUEST;
      if (isUserRejectedRequestError) {
        EventsController.sendEvent({
          type: "track",
          event: "USER_REJECTED",
          properties: { message: error.message }
        });
      } else {
        EventsController.sendEvent({
          type: "track",
          event: "CONNECT_ERROR",
          properties: { message: error?.message ?? "Unknown" }
        });
      }
      this.error = true;
    }
  }
  onConnectionsChange(connections) {
    if (this.connector?.chain && connections.get(this.connector.chain) && this.isAlreadyConnected(this.connector)) {
      const newConnections = connections.get(this.connector.chain) ?? [];
      const isMultiWalletEnabled = this.remoteFeatures?.multiWallet;
      if (newConnections.length === 0) {
        RouterController.replace("Connect");
      } else {
        const accounts = ConnectionControllerUtil.getConnectionsByConnectorId(this.connectionsByNamespace, this.connector.id).flatMap((c) => c.accounts);
        const newAccounts = ConnectionControllerUtil.getConnectionsByConnectorId(newConnections, this.connector.id).flatMap((c) => c.accounts);
        if (newAccounts.length === 0) {
          if (this.hasMultipleConnections && isMultiWalletEnabled) {
            RouterController.replace("ProfileWallets");
            SnackController.showSuccess("Wallet deleted");
          } else {
            ModalController.close();
          }
        } else {
          const isAllAccountsSame = accounts.every((a) => newAccounts.some((b) => HelpersUtil$1.isLowerCaseMatch(a.address, b.address)));
          if (!isAllAccountsSame && isMultiWalletEnabled) {
            RouterController.replace("ProfileWallets");
          }
        }
      }
    }
  }
  isAlreadyConnected(connector) {
    return Boolean(connector) && this.connectionsByNamespace.some((c) => HelpersUtil$1.isLowerCaseMatch(c.connectorId, connector.id));
  }
};
W3mConnectingExternalView = __decorate$1e([
  customElement("w3m-connecting-external-view")
], W3mConnectingExternalView);
const styles$S = i$1`
  wui-flex,
  wui-list-wallet {
    width: 100%;
  }
`;
var __decorate$1d = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mConnectingMultiChainView = class W3mConnectingMultiChainView2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.activeConnector = ConnectorController.state.activeConnector;
    this.unsubscribe.push(...[ConnectorController.subscribeKey("activeConnector", (val) => this.activeConnector = val)]);
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    return T`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["3", "5", "5", "5"]}
        gap="5"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-wallet-image
            size="lg"
            imageSrc=${o(AssetUtil.getConnectorImage(this.activeConnector))}
          ></wui-wallet-image>
        </wui-flex>
        <wui-flex
          flexDirection="column"
          alignItems="center"
          gap="2"
          .padding=${["0", "3", "0", "3"]}
        >
          <wui-text variant="lg-medium" color="primary">
            Select Chain for ${this.activeConnector?.name}
          </wui-text>
          <wui-text align="center" variant="lg-regular" color="secondary"
            >Select which chain to connect to your multi chain wallet</wui-text
          >
        </wui-flex>
        <wui-flex
          flexGrow="1"
          flexDirection="column"
          alignItems="center"
          gap="2"
          .padding=${["2", "0", "2", "0"]}
        >
          ${this.networksTemplate()}
        </wui-flex>
      </wui-flex>
    `;
  }
  networksTemplate() {
    return this.activeConnector?.connectors?.map((connector, index2) => connector.name ? T`
            <w3m-list-wallet
              displayIndex=${index2}
              imageSrc=${o(AssetUtil.getChainImage(connector.chain))}
              name=${ConstantsUtil$1.CHAIN_NAME_MAP[connector.chain]}
              @click=${() => this.onConnector(connector)}
              size="sm"
              data-testid="wui-list-chain-${connector.chain}"
              rdnsId=${connector.explorerWallet?.rdns}
            ></w3m-list-wallet>
          ` : null);
  }
  onConnector(provider) {
    const connector = this.activeConnector?.connectors?.find((p) => p.chain === provider.chain);
    const redirectView = RouterController.state.data?.redirectView;
    if (!connector) {
      SnackController.showError("Failed to find connector");
      return;
    }
    if (connector.id === "walletConnect") {
      if (CoreHelperUtil.isMobile()) {
        RouterController.push("AllWallets");
      } else {
        RouterController.push("ConnectingWalletConnect", { redirectView });
      }
    } else {
      RouterController.push("ConnectingExternal", {
        connector,
        redirectView,
        wallet: this.activeConnector?.explorerWallet
      });
    }
  }
};
W3mConnectingMultiChainView.styles = styles$S;
__decorate$1d([
  r()
], W3mConnectingMultiChainView.prototype, "activeConnector", void 0);
W3mConnectingMultiChainView = __decorate$1d([
  customElement("w3m-connecting-multi-chain-view")
], W3mConnectingMultiChainView);
var __decorate$1c = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mConnectingHeader = class W3mConnectingHeader2 extends i {
  constructor() {
    super(...arguments);
    this.platformTabs = [];
    this.unsubscribe = [];
    this.platforms = [];
    this.onSelectPlatfrom = void 0;
  }
  disconnectCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    const tabs = this.generateTabs();
    return T`
      <wui-flex justifyContent="center" .padding=${["0", "0", "4", "0"]}>
        <wui-tabs .tabs=${tabs} .onTabChange=${this.onTabChange.bind(this)}></wui-tabs>
      </wui-flex>
    `;
  }
  generateTabs() {
    const tabs = this.platforms.map((platform) => {
      if (platform === "browser") {
        return { label: "Browser", icon: "extension", platform: "browser" };
      } else if (platform === "mobile") {
        return { label: "Mobile", icon: "mobile", platform: "mobile" };
      } else if (platform === "qrcode") {
        return { label: "Mobile", icon: "mobile", platform: "qrcode" };
      } else if (platform === "web") {
        return { label: "Webapp", icon: "browser", platform: "web" };
      } else if (platform === "desktop") {
        return { label: "Desktop", icon: "desktop", platform: "desktop" };
      }
      return { label: "Browser", icon: "extension", platform: "unsupported" };
    });
    this.platformTabs = tabs.map(({ platform }) => platform);
    return tabs;
  }
  onTabChange(index2) {
    const tab = this.platformTabs[index2];
    if (tab) {
      this.onSelectPlatfrom?.(tab);
    }
  }
};
__decorate$1c([
  n({ type: Array })
], W3mConnectingHeader.prototype, "platforms", void 0);
__decorate$1c([
  n()
], W3mConnectingHeader.prototype, "onSelectPlatfrom", void 0);
W3mConnectingHeader = __decorate$1c([
  customElement("w3m-connecting-header")
], W3mConnectingHeader);
var __decorate$1b = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mConnectingWcBrowser = class W3mConnectingWcBrowser2 extends W3mConnectingWidget {
  constructor() {
    super();
    if (!this.wallet) {
      throw new Error("w3m-connecting-wc-browser: No wallet provided");
    }
    this.onConnect = this.onConnectProxy.bind(this);
    this.onAutoConnect = this.onConnectProxy.bind(this);
    EventsController.sendEvent({
      type: "track",
      event: "SELECT_WALLET",
      properties: {
        name: this.wallet.name,
        platform: "browser",
        displayIndex: this.wallet?.display_index,
        walletRank: this.wallet.order,
        view: RouterController.state.view
      }
    });
  }
  async onConnectProxy() {
    try {
      this.error = false;
      const { connectors } = ConnectorController.state;
      const connector = connectors.find((c) => c.type === "ANNOUNCED" && c.info?.rdns === this.wallet?.rdns || c.type === "INJECTED" || c.name === this.wallet?.name);
      if (connector) {
        await ConnectionController.connectExternal(connector, connector.chain);
      } else {
        throw new Error("w3m-connecting-wc-browser: No connector found");
      }
      ModalController.close();
    } catch (error) {
      const isUserRejectedRequestError = error instanceof AppKitError && error.originalName === ErrorUtil$1.PROVIDER_RPC_ERROR_NAME.USER_REJECTED_REQUEST;
      if (isUserRejectedRequestError) {
        EventsController.sendEvent({
          type: "track",
          event: "USER_REJECTED",
          properties: { message: error.message }
        });
      } else {
        EventsController.sendEvent({
          type: "track",
          event: "CONNECT_ERROR",
          properties: { message: error?.message ?? "Unknown" }
        });
      }
      this.error = true;
    }
  }
};
W3mConnectingWcBrowser = __decorate$1b([
  customElement("w3m-connecting-wc-browser")
], W3mConnectingWcBrowser);
var __decorate$1a = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mConnectingWcDesktop = class W3mConnectingWcDesktop2 extends W3mConnectingWidget {
  constructor() {
    super();
    if (!this.wallet) {
      throw new Error("w3m-connecting-wc-desktop: No wallet provided");
    }
    this.onConnect = this.onConnectProxy.bind(this);
    this.onRender = this.onRenderProxy.bind(this);
    EventsController.sendEvent({
      type: "track",
      event: "SELECT_WALLET",
      properties: {
        name: this.wallet.name,
        platform: "desktop",
        displayIndex: this.wallet?.display_index,
        walletRank: this.wallet.order,
        view: RouterController.state.view
      }
    });
  }
  onRenderProxy() {
    if (!this.ready && this.uri) {
      this.ready = true;
      this.onConnect?.();
    }
  }
  onConnectProxy() {
    if (this.wallet?.desktop_link && this.uri) {
      try {
        this.error = false;
        const { desktop_link, name } = this.wallet;
        const { redirect, href } = CoreHelperUtil.formatNativeUrl(desktop_link, this.uri);
        ConnectionController.setWcLinking({ name, href });
        ConnectionController.setRecentWallet(this.wallet);
        CoreHelperUtil.openHref(redirect, "_blank");
      } catch {
        this.error = true;
      }
    }
  }
};
W3mConnectingWcDesktop = __decorate$1a([
  customElement("w3m-connecting-wc-desktop")
], W3mConnectingWcDesktop);
var __decorate$19 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mConnectingWcMobile = class W3mConnectingWcMobile2 extends W3mConnectingWidget {
  constructor() {
    super();
    this.btnLabelTimeout = void 0;
    this.redirectDeeplink = void 0;
    this.redirectUniversalLink = void 0;
    this.target = void 0;
    this.preferUniversalLinks = OptionsController.state.experimental_preferUniversalLinks;
    this.isLoading = true;
    this.onConnect = () => {
      ConnectionControllerUtil.onConnectMobile(this.wallet);
    };
    if (!this.wallet) {
      throw new Error("w3m-connecting-wc-mobile: No wallet provided");
    }
    this.secondaryBtnLabel = "Open";
    this.secondaryLabel = ConstantsUtil$2.CONNECT_LABELS.MOBILE;
    this.secondaryBtnIcon = "externalLink";
    this.onHandleURI();
    this.unsubscribe.push(ConnectionController.subscribeKey("wcUri", () => {
      this.onHandleURI();
    }));
    EventsController.sendEvent({
      type: "track",
      event: "SELECT_WALLET",
      properties: {
        name: this.wallet.name,
        platform: "mobile",
        displayIndex: this.wallet?.display_index,
        walletRank: this.wallet.order,
        view: RouterController.state.view
      }
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    clearTimeout(this.btnLabelTimeout);
  }
  onHandleURI() {
    this.isLoading = !this.uri;
    if (!this.ready && this.uri) {
      this.ready = true;
      this.onConnect?.();
    }
  }
  onTryAgain() {
    ConnectionController.setWcError(false);
    this.onConnect?.();
  }
};
__decorate$19([
  r()
], W3mConnectingWcMobile.prototype, "redirectDeeplink", void 0);
__decorate$19([
  r()
], W3mConnectingWcMobile.prototype, "redirectUniversalLink", void 0);
__decorate$19([
  r()
], W3mConnectingWcMobile.prototype, "target", void 0);
__decorate$19([
  r()
], W3mConnectingWcMobile.prototype, "preferUniversalLinks", void 0);
__decorate$19([
  r()
], W3mConnectingWcMobile.prototype, "isLoading", void 0);
W3mConnectingWcMobile = __decorate$19([
  customElement("w3m-connecting-wc-mobile")
], W3mConnectingWcMobile);
const styles$R = css`
  wui-shimmer {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: ${({ borderRadius }) => borderRadius[4]};
  }

  wui-qr-code {
    opacity: 0;
    animation-duration: ${({ durations }) => durations["xl"]};
    animation-timing-function: ${({ easings }) => easings["ease-out-power-2"]};
    animation-name: fade-in;
    animation-fill-mode: forwards;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
var __decorate$18 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mConnectingWcQrcode = class W3mConnectingWcQrcode2 extends W3mConnectingWidget {
  constructor() {
    super();
    this.basic = false;
  }
  firstUpdated() {
    if (!this.basic) {
      EventsController.sendEvent({
        type: "track",
        event: "SELECT_WALLET",
        properties: {
          name: this.wallet?.name ?? "WalletConnect",
          platform: "qrcode",
          displayIndex: this.wallet?.display_index,
          walletRank: this.wallet?.order,
          view: RouterController.state.view
        }
      });
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.unsubscribe?.forEach((unsub) => unsub());
  }
  render() {
    this.onRenderProxy();
    return T`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["0", "5", "5", "5"]}
        gap="5"
      >
        <wui-shimmer width="100%"> ${this.qrCodeTemplate()} </wui-shimmer>
        <wui-text variant="lg-medium" color="primary"> Scan this QR Code with your phone </wui-text>
        ${this.copyTemplate()}
      </wui-flex>
      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `;
  }
  onRenderProxy() {
    if (!this.ready && this.uri) {
      this.ready = true;
    }
  }
  qrCodeTemplate() {
    if (!this.uri || !this.ready) {
      return null;
    }
    const alt = this.wallet ? this.wallet.name : void 0;
    ConnectionController.setWcLinking(void 0);
    ConnectionController.setRecentWallet(this.wallet);
    const qrColor = ThemeController.state.themeVariables["--apkt-qr-color"] ?? ThemeController.state.themeVariables["--w3m-qr-color"];
    return T` <wui-qr-code
      theme=${ThemeController.state.themeMode}
      uri=${this.uri}
      imageSrc=${o(AssetUtil.getWalletImage(this.wallet))}
      color=${o(qrColor)}
      alt=${o(alt)}
      data-testid="wui-qr-code"
    ></wui-qr-code>`;
  }
  copyTemplate() {
    const inactive = !this.uri || !this.ready;
    return T`<wui-button
      .disabled=${inactive}
      @click=${this.onCopyUri}
      variant="neutral-secondary"
      size="sm"
      data-testid="copy-wc2-uri"
    >
      Copy link
      <wui-icon size="sm" color="inherit" name="copy" slot="iconRight"></wui-icon>
    </wui-button>`;
  }
};
W3mConnectingWcQrcode.styles = styles$R;
__decorate$18([
  n({ type: Boolean })
], W3mConnectingWcQrcode.prototype, "basic", void 0);
W3mConnectingWcQrcode = __decorate$18([
  customElement("w3m-connecting-wc-qrcode")
], W3mConnectingWcQrcode);
var __decorate$17 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mConnectingWcUnsupported = class W3mConnectingWcUnsupported2 extends i {
  constructor() {
    super();
    this.wallet = RouterController.state.data?.wallet;
    if (!this.wallet) {
      throw new Error("w3m-connecting-wc-unsupported: No wallet provided");
    }
    EventsController.sendEvent({
      type: "track",
      event: "SELECT_WALLET",
      properties: {
        name: this.wallet.name,
        platform: "browser",
        displayIndex: this.wallet?.display_index,
        walletRank: this.wallet?.order,
        view: RouterController.state.view
      }
    });
  }
  render() {
    return T`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["10", "5", "5", "5"]}
        gap="5"
      >
        <wui-wallet-image
          size="lg"
          imageSrc=${o(AssetUtil.getWalletImage(this.wallet))}
        ></wui-wallet-image>

        <wui-text variant="md-regular" color="primary">Not Detected</wui-text>
      </wui-flex>

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `;
  }
};
W3mConnectingWcUnsupported = __decorate$17([
  customElement("w3m-connecting-wc-unsupported")
], W3mConnectingWcUnsupported);
var __decorate$16 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mConnectingWcWeb = class W3mConnectingWcWeb2 extends W3mConnectingWidget {
  constructor() {
    super();
    this.isLoading = true;
    if (!this.wallet) {
      throw new Error("w3m-connecting-wc-web: No wallet provided");
    }
    this.onConnect = this.onConnectProxy.bind(this);
    this.secondaryBtnLabel = "Open";
    this.secondaryLabel = ConstantsUtil$2.CONNECT_LABELS.MOBILE;
    this.secondaryBtnIcon = "externalLink";
    this.updateLoadingState();
    this.unsubscribe.push(ConnectionController.subscribeKey("wcUri", () => {
      this.updateLoadingState();
    }));
    EventsController.sendEvent({
      type: "track",
      event: "SELECT_WALLET",
      properties: {
        name: this.wallet.name,
        platform: "web",
        displayIndex: this.wallet?.display_index,
        walletRank: this.wallet?.order,
        view: RouterController.state.view
      }
    });
  }
  updateLoadingState() {
    this.isLoading = !this.uri;
  }
  onConnectProxy() {
    if (this.wallet?.webapp_link && this.uri) {
      try {
        this.error = false;
        const { webapp_link, name } = this.wallet;
        const { redirect, href } = CoreHelperUtil.formatUniversalUrl(webapp_link, this.uri);
        ConnectionController.setWcLinking({ name, href });
        ConnectionController.setRecentWallet(this.wallet);
        CoreHelperUtil.openHref(redirect, "_blank");
      } catch {
        this.error = true;
      }
    }
  }
};
__decorate$16([
  r()
], W3mConnectingWcWeb.prototype, "isLoading", void 0);
W3mConnectingWcWeb = __decorate$16([
  customElement("w3m-connecting-wc-web")
], W3mConnectingWcWeb);
const styles$Q = css`
  :host([data-mobile-fullscreen='true']) {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  :host([data-mobile-fullscreen='true']) wui-ux-by-reown {
    margin-top: auto;
  }
`;
var __decorate$15 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mConnectingWcView = class W3mConnectingWcView2 extends i {
  constructor() {
    super();
    this.wallet = RouterController.state.data?.wallet;
    this.unsubscribe = [];
    this.platform = void 0;
    this.platforms = [];
    this.isSiwxEnabled = Boolean(OptionsController.state.siwx);
    this.remoteFeatures = OptionsController.state.remoteFeatures;
    this.displayBranding = true;
    this.basic = false;
    this.determinePlatforms();
    this.initializeConnection();
    this.unsubscribe.push(OptionsController.subscribeKey("remoteFeatures", (val) => this.remoteFeatures = val));
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    if (OptionsController.state.enableMobileFullScreen) {
      this.setAttribute("data-mobile-fullscreen", "true");
    }
    return T`
      ${this.headerTemplate()}
      <div class="platform-container">${this.platformTemplate()}</div>
      ${this.reownBrandingTemplate()}
    `;
  }
  reownBrandingTemplate() {
    if (!this.remoteFeatures?.reownBranding || !this.displayBranding) {
      return null;
    }
    return T`<wui-ux-by-reown></wui-ux-by-reown>`;
  }
  async initializeConnection(retry = false) {
    if (this.platform === "browser" || OptionsController.state.manualWCControl && !retry) {
      return;
    }
    try {
      const { wcPairingExpiry, status } = ConnectionController.state;
      const { redirectView } = RouterController.state.data ?? {};
      if (retry || OptionsController.state.enableEmbedded || CoreHelperUtil.isPairingExpired(wcPairingExpiry) || status === "connecting") {
        const connectionsByNamespace = ConnectionController.getConnections(ChainController.state.activeChain);
        const isMultiWalletEnabled = this.remoteFeatures?.multiWallet;
        const hasConnections = connectionsByNamespace.length > 0;
        await ConnectionController.connectWalletConnect({ cache: "never" });
        if (!this.isSiwxEnabled) {
          if (hasConnections && isMultiWalletEnabled) {
            RouterController.replace("ProfileWallets");
            SnackController.showSuccess("New Wallet Added");
          } else if (redirectView) {
            RouterController.replace(redirectView);
          } else {
            ModalController.close();
          }
        }
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes("An error occurred when attempting to switch chain") && !OptionsController.state.enableNetworkSwitch) {
        if (ChainController.state.activeChain) {
          ChainController.setActiveCaipNetwork(CaipNetworksUtil.getUnsupportedNetwork(`${ChainController.state.activeChain}:${ChainController.state.activeCaipNetwork?.id}`));
          ChainController.showUnsupportedChainUI();
          return;
        }
      }
      const isUserRejectedRequestError = error instanceof AppKitError && error.originalName === ErrorUtil$1.PROVIDER_RPC_ERROR_NAME.USER_REJECTED_REQUEST;
      if (isUserRejectedRequestError) {
        EventsController.sendEvent({
          type: "track",
          event: "USER_REJECTED",
          properties: { message: error.message }
        });
      } else {
        EventsController.sendEvent({
          type: "track",
          event: "CONNECT_ERROR",
          properties: { message: error?.message ?? "Unknown" }
        });
      }
      ConnectionController.setWcError(true);
      SnackController.showError(error.message ?? "Connection error");
      ConnectionController.resetWcConnection();
      RouterController.goBack();
    }
  }
  determinePlatforms() {
    if (!this.wallet) {
      this.platforms.push("qrcode");
      this.platform = "qrcode";
      return;
    }
    if (this.platform) {
      return;
    }
    const { mobile_link, desktop_link, webapp_link, injected, rdns } = this.wallet;
    const injectedIds = injected?.map(({ injected_id }) => injected_id).filter(Boolean);
    const browserIds = [...rdns ? [rdns] : injectedIds ?? []];
    const isBrowser = OptionsController.state.isUniversalProvider ? false : browserIds.length;
    const hasMobileWCLink = mobile_link;
    const isWebWc = webapp_link;
    const isBrowserInstalled = ConnectionController.checkInstalled(browserIds);
    const isBrowserWc = isBrowser && isBrowserInstalled;
    const isDesktopWc = desktop_link && !CoreHelperUtil.isMobile();
    if (isBrowserWc && !ChainController.state.noAdapters) {
      this.platforms.push("browser");
    }
    if (hasMobileWCLink) {
      this.platforms.push(CoreHelperUtil.isMobile() ? "mobile" : "qrcode");
    }
    if (isWebWc) {
      this.platforms.push("web");
    }
    if (isDesktopWc) {
      this.platforms.push("desktop");
    }
    const isCustomDeeplinkWallet = MobileWalletUtil.isCustomDeeplinkWallet(this.wallet.id, ChainController.state.activeChain);
    if (!isBrowserWc && isBrowser && !ChainController.state.noAdapters && !isCustomDeeplinkWallet) {
      this.platforms.push("unsupported");
    }
    this.platform = this.platforms[0];
  }
  platformTemplate() {
    switch (this.platform) {
      case "browser":
        return T`<w3m-connecting-wc-browser></w3m-connecting-wc-browser>`;
      case "web":
        return T`<w3m-connecting-wc-web></w3m-connecting-wc-web>`;
      case "desktop":
        return T`
          <w3m-connecting-wc-desktop .onRetry=${() => this.initializeConnection(true)}>
          </w3m-connecting-wc-desktop>
        `;
      case "mobile":
        return T`
          <w3m-connecting-wc-mobile isMobile .onRetry=${() => this.initializeConnection(true)}>
          </w3m-connecting-wc-mobile>
        `;
      case "qrcode":
        return T`<w3m-connecting-wc-qrcode ?basic=${this.basic}></w3m-connecting-wc-qrcode>`;
      default:
        return T`<w3m-connecting-wc-unsupported></w3m-connecting-wc-unsupported>`;
    }
  }
  headerTemplate() {
    const multiPlatform = this.platforms.length > 1;
    if (!multiPlatform) {
      return null;
    }
    return T`
      <w3m-connecting-header
        .platforms=${this.platforms}
        .onSelectPlatfrom=${this.onSelectPlatform.bind(this)}
      >
      </w3m-connecting-header>
    `;
  }
  async onSelectPlatform(platform) {
    const container = this.shadowRoot?.querySelector("div");
    if (container) {
      await container.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 200,
        fill: "forwards",
        easing: "ease"
      }).finished;
      this.platform = platform;
      container.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 200,
        fill: "forwards",
        easing: "ease"
      });
    }
  }
};
W3mConnectingWcView.styles = styles$Q;
__decorate$15([
  r()
], W3mConnectingWcView.prototype, "platform", void 0);
__decorate$15([
  r()
], W3mConnectingWcView.prototype, "platforms", void 0);
__decorate$15([
  r()
], W3mConnectingWcView.prototype, "isSiwxEnabled", void 0);
__decorate$15([
  r()
], W3mConnectingWcView.prototype, "remoteFeatures", void 0);
__decorate$15([
  n({ type: Boolean })
], W3mConnectingWcView.prototype, "displayBranding", void 0);
__decorate$15([
  n({ type: Boolean })
], W3mConnectingWcView.prototype, "basic", void 0);
W3mConnectingWcView = __decorate$15([
  customElement("w3m-connecting-wc-view")
], W3mConnectingWcView);
var __decorate$14 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mConnectingWcBasicView = class W3mConnectingWcBasicView2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.isMobile = CoreHelperUtil.isMobile();
    this.remoteFeatures = OptionsController.state.remoteFeatures;
    this.unsubscribe.push(OptionsController.subscribeKey("remoteFeatures", (val) => this.remoteFeatures = val));
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    if (this.isMobile) {
      const { featured, recommended } = ApiController.state;
      const { customWallets } = OptionsController.state;
      const recent = StorageUtil.getRecentWallets();
      const showConnectors = featured.length || recommended.length || customWallets?.length || recent.length;
      return T`<wui-flex flexDirection="column" gap="2" .margin=${["1", "3", "3", "3"]}>
        ${showConnectors ? T`<w3m-connector-list></w3m-connector-list>` : null}
        <w3m-all-wallets-widget></w3m-all-wallets-widget>
      </wui-flex>`;
    }
    return T`<wui-flex flexDirection="column" .padding=${["0", "0", "4", "0"]}>
        <w3m-connecting-wc-view ?basic=${true} .displayBranding=${false}></w3m-connecting-wc-view>
        <wui-flex flexDirection="column" .padding=${["0", "3", "0", "3"]}>
          <w3m-all-wallets-widget></w3m-all-wallets-widget>
        </wui-flex>
      </wui-flex>
      ${this.reownBrandingTemplate()} `;
  }
  reownBrandingTemplate() {
    if (!this.remoteFeatures?.reownBranding) {
      return null;
    }
    return T` <wui-flex flexDirection="column" .padding=${["1", "0", "1", "0"]}>
      <wui-ux-by-reown></wui-ux-by-reown>
    </wui-flex>`;
  }
};
__decorate$14([
  r()
], W3mConnectingWcBasicView.prototype, "isMobile", void 0);
__decorate$14([
  r()
], W3mConnectingWcBasicView.prototype, "remoteFeatures", void 0);
W3mConnectingWcBasicView = __decorate$14([
  customElement("w3m-connecting-wc-basic-view")
], W3mConnectingWcBasicView);
const styles$P = i$1`
  .continue-button-container {
    width: 100%;
  }
`;
var __decorate$13 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mChooseAccountNameView = class W3mChooseAccountNameView2 extends i {
  constructor() {
    super(...arguments);
    this.loading = false;
  }
  render() {
    return T`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="6"
        .padding=${["0", "0", "4", "0"]}
      >
        ${this.onboardingTemplate()} ${this.buttonsTemplate()}
        <wui-link
          @click=${() => {
      CoreHelperUtil.openHref(NavigationUtil.URLS.FAQ, "_blank");
    }}
        >
          Learn more about names
          <wui-icon color="inherit" slot="iconRight" name="externalLink"></wui-icon>
        </wui-link>
      </wui-flex>
    `;
  }
  onboardingTemplate() {
    return T` <wui-flex
      flexDirection="column"
      gap="6"
      alignItems="center"
      .padding=${["0", "6", "0", "6"]}
    >
      <wui-flex gap="3" alignItems="center" justifyContent="center">
        <wui-icon-box icon="id" size="xl" iconSize="xxl" color="default"></wui-icon-box>
      </wui-flex>
      <wui-flex flexDirection="column" alignItems="center" gap="3">
        <wui-text align="center" variant="lg-medium" color="primary">
          Choose your account name
        </wui-text>
        <wui-text align="center" variant="md-regular" color="primary">
          Finally say goodbye to 0x addresses, name your account to make it easier to exchange
          assets
        </wui-text>
      </wui-flex>
    </wui-flex>`;
  }
  buttonsTemplate() {
    return T`<wui-flex
      .padding=${["0", "8", "0", "8"]}
      gap="3"
      class="continue-button-container"
    >
      <wui-button
        fullWidth
        .loading=${this.loading}
        size="lg"
        borderRadius="xs"
        @click=${this.handleContinue.bind(this)}
        >Choose name
      </wui-button>
    </wui-flex>`;
  }
  handleContinue() {
    RouterController.push("RegisterAccountName");
    EventsController.sendEvent({
      type: "track",
      event: "OPEN_ENS_FLOW",
      properties: {
        isSmartAccount: getPreferredAccountType(ChainController.state.activeChain) === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT
      }
    });
  }
};
W3mChooseAccountNameView.styles = styles$P;
__decorate$13([
  r()
], W3mChooseAccountNameView.prototype, "loading", void 0);
W3mChooseAccountNameView = __decorate$13([
  customElement("w3m-choose-account-name-view")
], W3mChooseAccountNameView);
var __decorate$12 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mDownloadsView = class W3mDownloadsView2 extends i {
  constructor() {
    super(...arguments);
    this.wallet = RouterController.state.data?.wallet;
  }
  render() {
    if (!this.wallet) {
      throw new Error("w3m-downloads-view");
    }
    return T`
      <wui-flex gap="2" flexDirection="column" .padding=${["3", "3", "4", "3"]}>
        ${this.chromeTemplate()} ${this.iosTemplate()} ${this.androidTemplate()}
        ${this.homepageTemplate()}
      </wui-flex>
    `;
  }
  chromeTemplate() {
    if (!this.wallet?.chrome_store) {
      return null;
    }
    return T`<wui-list-item
      variant="icon"
      icon="chromeStore"
      iconVariant="square"
      @click=${this.onChromeStore.bind(this)}
      chevron
    >
      <wui-text variant="md-medium" color="primary">Chrome Extension</wui-text>
    </wui-list-item>`;
  }
  iosTemplate() {
    if (!this.wallet?.app_store) {
      return null;
    }
    return T`<wui-list-item
      variant="icon"
      icon="appStore"
      iconVariant="square"
      @click=${this.onAppStore.bind(this)}
      chevron
    >
      <wui-text variant="md-medium" color="primary">iOS App</wui-text>
    </wui-list-item>`;
  }
  androidTemplate() {
    if (!this.wallet?.play_store) {
      return null;
    }
    return T`<wui-list-item
      variant="icon"
      icon="playStore"
      iconVariant="square"
      @click=${this.onPlayStore.bind(this)}
      chevron
    >
      <wui-text variant="md-medium" color="primary">Android App</wui-text>
    </wui-list-item>`;
  }
  homepageTemplate() {
    if (!this.wallet?.homepage) {
      return null;
    }
    return T`
      <wui-list-item
        variant="icon"
        icon="browser"
        iconVariant="square-blue"
        @click=${this.onHomePage.bind(this)}
        chevron
      >
        <wui-text variant="md-medium" color="primary">Website</wui-text>
      </wui-list-item>
    `;
  }
  openStore(params) {
    if (params.href && this.wallet) {
      EventsController.sendEvent({
        type: "track",
        event: "GET_WALLET",
        properties: {
          name: this.wallet.name,
          walletRank: this.wallet.order,
          explorerId: this.wallet.id,
          type: params.type
        }
      });
      CoreHelperUtil.openHref(params.href, "_blank");
    }
  }
  onChromeStore() {
    if (this.wallet?.chrome_store) {
      this.openStore({ href: this.wallet.chrome_store, type: "chrome_store" });
    }
  }
  onAppStore() {
    if (this.wallet?.app_store) {
      this.openStore({ href: this.wallet.app_store, type: "app_store" });
    }
  }
  onPlayStore() {
    if (this.wallet?.play_store) {
      this.openStore({ href: this.wallet.play_store, type: "play_store" });
    }
  }
  onHomePage() {
    if (this.wallet?.homepage) {
      this.openStore({ href: this.wallet.homepage, type: "homepage" });
    }
  }
};
W3mDownloadsView = __decorate$12([
  customElement("w3m-downloads-view")
], W3mDownloadsView);
var __decorate$11 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
const EXPLORER = "https://walletguide.walletconnect.network";
let W3mGetWalletView = class W3mGetWalletView2 extends i {
  render() {
    return T`
      <wui-flex flexDirection="column" .padding=${["0", "3", "3", "3"]} gap="2">
        ${this.recommendedWalletsTemplate()}
        <w3m-list-wallet
          name="Explore all"
          showAllWallets
          walletIcon="allWallets"
          icon="externalLink"
          size="sm"
          @click=${() => {
      CoreHelperUtil.openHref("https://walletguide.walletconnect.network/", "_blank");
    }}
        ></w3m-list-wallet>
      </wui-flex>
    `;
  }
  recommendedWalletsTemplate() {
    const { recommended, featured } = ApiController.state;
    const { customWallets } = OptionsController.state;
    const wallets = [...featured, ...customWallets ?? [], ...recommended].slice(0, 4);
    return wallets.map((wallet, index2) => T`
        <w3m-list-wallet
          displayIndex=${index2}
          name=${wallet.name ?? "Unknown"}
          tagVariant="accent"
          size="sm"
          imageSrc=${o(AssetUtil.getWalletImage(wallet))}
          @click=${() => {
      this.onWalletClick(wallet);
    }}
        ></w3m-list-wallet>
      `);
  }
  onWalletClick(wallet) {
    EventsController.sendEvent({
      type: "track",
      event: "GET_WALLET",
      properties: {
        name: wallet.name,
        walletRank: void 0,
        explorerId: wallet.id,
        type: "homepage"
      }
    });
    CoreHelperUtil.openHref(wallet.homepage ?? EXPLORER, "_blank");
  }
};
W3mGetWalletView = __decorate$11([
  customElement("w3m-get-wallet-view")
], W3mGetWalletView);
var __decorate$10 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mHelpWidget = class W3mHelpWidget2 extends i {
  constructor() {
    super(...arguments);
    this.data = [];
  }
  render() {
    return T`
      <wui-flex flexDirection="column" alignItems="center" gap="4">
        ${this.data.map((item) => T`
            <wui-flex flexDirection="column" alignItems="center" gap="5">
              <wui-flex flexDirection="row" justifyContent="center" gap="1">
                ${item.images.map((image) => T`<wui-visual size="sm" name=${image}></wui-visual>`)}
              </wui-flex>
            </wui-flex>
            <wui-flex flexDirection="column" alignItems="center" gap="1">
              <wui-text variant="md-regular" color="primary" align="center">${item.title}</wui-text>
              <wui-text variant="sm-regular" color="secondary" align="center"
                >${item.text}</wui-text
              >
            </wui-flex>
          `)}
      </wui-flex>
    `;
  }
};
__decorate$10([
  n({ type: Array })
], W3mHelpWidget.prototype, "data", void 0);
W3mHelpWidget = __decorate$10([
  customElement("w3m-help-widget")
], W3mHelpWidget);
var __decorate$$ = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
const data$1 = [
  {
    images: ["login", "profile", "lock"],
    title: "One login for all of web3",
    text: "Log in to any app by connecting your wallet. Say goodbye to countless passwords!"
  },
  {
    images: ["defi", "nft", "eth"],
    title: "A home for your digital assets",
    text: "A wallet lets you store, send and receive digital assets like cryptocurrencies and NFTs."
  },
  {
    images: ["browser", "noun", "dao"],
    title: "Your gateway to a new web",
    text: "With your wallet, you can explore and interact with DeFi, NFTs, DAOs, and much more."
  }
];
let W3mWhatIsAWalletView = class W3mWhatIsAWalletView2 extends i {
  render() {
    return T`
      <wui-flex
        flexDirection="column"
        .padding=${["6", "5", "5", "5"]}
        alignItems="center"
        gap="5"
      >
        <w3m-help-widget .data=${data$1}></w3m-help-widget>
        <wui-button variant="accent-primary" size="md" @click=${this.onGetWallet.bind(this)}>
          <wui-icon color="inherit" slot="iconLeft" name="wallet"></wui-icon>
          Get a wallet
        </wui-button>
      </wui-flex>
    `;
  }
  onGetWallet() {
    EventsController.sendEvent({ type: "track", event: "CLICK_GET_WALLET_HELP" });
    RouterController.push("GetWallet");
  }
};
W3mWhatIsAWalletView = __decorate$$([
  customElement("w3m-what-is-a-wallet-view")
], W3mWhatIsAWalletView);
const styles$O = css`
  wui-flex {
    max-height: clamp(360px, 540px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
    transition: opacity ${({ durations }) => durations["lg"]}
      ${({ easings }) => easings["ease-out-power-2"]};
    will-change: opacity;
  }
  wui-flex::-webkit-scrollbar {
    display: none;
  }
  wui-flex.disabled {
    opacity: 0.3;
    pointer-events: none;
    user-select: none;
  }
`;
var __decorate$_ = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mConnectWalletsView = class W3mConnectWalletsView2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.checked = OptionsStateController.state.isLegalCheckboxChecked;
    this.unsubscribe.push(OptionsStateController.subscribeKey("isLegalCheckboxChecked", (val) => {
      this.checked = val;
    }));
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    const { termsConditionsUrl, privacyPolicyUrl } = OptionsController.state;
    const legalCheckbox = OptionsController.state.features?.legalCheckbox;
    const legalUrl = termsConditionsUrl || privacyPolicyUrl;
    const showLegalCheckbox = Boolean(legalUrl) && Boolean(legalCheckbox);
    const disabled = showLegalCheckbox && !this.checked;
    const tabIndex = disabled ? -1 : void 0;
    return T`
      <w3m-legal-checkbox></w3m-legal-checkbox>
      <wui-flex
        flexDirection="column"
        .padding=${showLegalCheckbox ? ["0", "3", "3", "3"] : "3"}
        gap="2"
        class=${o(disabled ? "disabled" : void 0)}
      >
        <w3m-wallet-login-list tabIdx=${o(tabIndex)}></w3m-wallet-login-list>
      </wui-flex>
    `;
  }
};
W3mConnectWalletsView.styles = styles$O;
__decorate$_([
  r()
], W3mConnectWalletsView.prototype, "checked", void 0);
W3mConnectWalletsView = __decorate$_([
  customElement("w3m-connect-wallets-view")
], W3mConnectWalletsView);
const styles$N = i$1`
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-loading-hexagon {
    position: absolute;
  }

  wui-icon-box {
    position: absolute;
    right: 4px;
    bottom: 0;
    opacity: 0;
    transform: scale(0.5);
    z-index: 1;
  }

  wui-button {
    display: none;
  }

  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }

  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  wui-button[data-retry='true'] {
    display: block;
    opacity: 1;
  }
`;
var __decorate$Z = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mNetworkSwitchView = class W3mNetworkSwitchView2 extends i {
  constructor() {
    super();
    this.network = RouterController.state.data?.network;
    this.unsubscribe = [];
    this.showRetry = false;
    this.error = false;
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  firstUpdated() {
    this.onSwitchNetwork();
  }
  render() {
    if (!this.network) {
      throw new Error("w3m-network-switch-view: No network provided");
    }
    this.onShowRetry();
    const label = this.getLabel();
    const subLabel = this.getSubLabel();
    return T`
      <wui-flex
        data-error=${this.error}
        flexDirection="column"
        alignItems="center"
        .padding=${["10", "5", "10", "5"]}
        gap="7"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-network-image
            size="lg"
            imageSrc=${o(AssetUtil.getNetworkImage(this.network))}
          ></wui-network-image>

          ${this.error ? null : T`<wui-loading-hexagon></wui-loading-hexagon>`}

          <wui-icon-box color="error" icon="close" size="sm"></wui-icon-box>
        </wui-flex>

        <wui-flex flexDirection="column" alignItems="center" gap="2">
          <wui-text align="center" variant="h6-regular" color="primary">${label}</wui-text>
          <wui-text align="center" variant="md-regular" color="secondary">${subLabel}</wui-text>
        </wui-flex>

        <wui-button
          data-retry=${this.showRetry}
          variant="accent-primary"
          size="md"
          .disabled=${!this.error}
          @click=${this.onSwitchNetwork.bind(this)}
        >
          <wui-icon color="inherit" slot="iconLeft" name="refresh"></wui-icon>
          Try again
        </wui-button>
      </wui-flex>
    `;
  }
  getSubLabel() {
    const connectorId = ConnectorController.getConnectorId(ChainController.state.activeChain);
    const authConnector = ConnectorController.getAuthConnector();
    if (authConnector && connectorId === ConstantsUtil$1.CONNECTOR_ID.AUTH) {
      return "";
    }
    return this.error ? "Switch can be declined if chain is not supported by a wallet or previous request is still active" : "Accept connection request in your wallet";
  }
  getLabel() {
    const connectorId = ConnectorController.getConnectorId(ChainController.state.activeChain);
    const authConnector = ConnectorController.getAuthConnector();
    if (authConnector && connectorId === ConstantsUtil$1.CONNECTOR_ID.AUTH) {
      return `Switching to ${this.network?.name ?? "Unknown"} network...`;
    }
    return this.error ? "Switch declined" : "Approve in wallet";
  }
  onShowRetry() {
    if (this.error && !this.showRetry) {
      this.showRetry = true;
      const retryButton = this.shadowRoot?.querySelector("wui-button");
      retryButton?.animate([{ opacity: 0 }, { opacity: 1 }], {
        fill: "forwards",
        easing: "ease"
      });
    }
  }
  async onSwitchNetwork() {
    try {
      this.error = false;
      if (ChainController.state.activeChain !== this.network?.chainNamespace) {
        ChainController.setIsSwitchingNamespace(true);
      }
      if (this.network) {
        await ChainController.switchActiveNetwork(this.network);
        const isAuthenticated = await SIWXUtil.isAuthenticated();
        if (isAuthenticated) {
          RouterController.goBack();
        }
      }
    } catch (error) {
      this.error = true;
    }
  }
};
W3mNetworkSwitchView.styles = styles$N;
__decorate$Z([
  r()
], W3mNetworkSwitchView.prototype, "showRetry", void 0);
__decorate$Z([
  r()
], W3mNetworkSwitchView.prototype, "error", void 0);
W3mNetworkSwitchView = __decorate$Z([
  customElement("w3m-network-switch-view")
], W3mNetworkSwitchView);
const styles$M = i$1`
  .container {
    max-height: 360px;
    overflow: auto;
  }

  .container::-webkit-scrollbar {
    display: none;
  }
`;
var __decorate$Y = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mNetworksView = class W3mNetworksView2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.network = ChainController.state.activeCaipNetwork;
    this.requestedCaipNetworks = ChainController.getCaipNetworks();
    this.search = "";
    this.onDebouncedSearch = CoreHelperUtil.debounce((value) => {
      this.search = value;
    }, 100);
    this.unsubscribe.push(AssetController.subscribeNetworkImages(() => this.requestUpdate()), ChainController.subscribeKey("activeCaipNetwork", (val) => this.network = val), ChainController.subscribe(() => {
      this.requestedCaipNetworks = ChainController.getAllRequestedCaipNetworks();
    }));
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    return T`
      ${this.templateSearchInput()}
      <wui-flex
        class="container"
        .padding=${["0", "3", "3", "3"]}
        flexDirection="column"
        gap="2"
      >
        ${this.networksTemplate()}
      </wui-flex>
    `;
  }
  templateSearchInput() {
    return T`
      <wui-flex gap="2" .padding=${["0", "3", "3", "3"]}>
        <wui-input-text
          @inputChange=${this.onInputChange.bind(this)}
          class="network-search-input"
          size="md"
          placeholder="Search network"
          icon="search"
        ></wui-input-text>
      </wui-flex>
    `;
  }
  onInputChange(event) {
    this.onDebouncedSearch(event.detail);
  }
  networksTemplate() {
    const approvedCaipNetworkIds = ChainController.getAllApprovedCaipNetworkIds();
    const sortedNetworks = CoreHelperUtil.sortRequestedNetworks(approvedCaipNetworkIds, this.requestedCaipNetworks);
    if (this.search) {
      this.filteredNetworks = sortedNetworks?.filter((network) => network?.name?.toLowerCase().includes(this.search.toLowerCase()));
    } else {
      this.filteredNetworks = sortedNetworks;
    }
    return this.filteredNetworks?.map((network) => T`
        <wui-list-network
          .selected=${this.network?.id === network.id}
          imageSrc=${o(AssetUtil.getNetworkImage(network))}
          type="network"
          name=${network.name ?? network.id}
          @click=${() => this.onSwitchNetwork(network)}
          .disabled=${ChainController.isCaipNetworkDisabled(network)}
          data-testid=${`w3m-network-switch-${network.name ?? network.id}`}
        ></wui-list-network>
      `);
  }
  onSwitchNetwork(network) {
    NetworkUtil.onSwitchNetwork({ network });
  }
};
W3mNetworksView.styles = styles$M;
__decorate$Y([
  r()
], W3mNetworksView.prototype, "network", void 0);
__decorate$Y([
  r()
], W3mNetworksView.prototype, "requestedCaipNetworks", void 0);
__decorate$Y([
  r()
], W3mNetworksView.prototype, "filteredNetworks", void 0);
__decorate$Y([
  r()
], W3mNetworksView.prototype, "search", void 0);
W3mNetworksView = __decorate$Y([
  customElement("w3m-networks-view")
], W3mNetworksView);
const styles$L = css`
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-loading-thumbnail {
    position: absolute;
  }

  wui-visual {
    border-radius: calc(
      ${({ borderRadius }) => borderRadius["1"]} * 9 - ${({ borderRadius }) => borderRadius["3"]}
    );
    position: relative;
    overflow: hidden;
  }

  wui-visual::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    border-radius: calc(
      ${({ borderRadius }) => borderRadius["1"]} * 9 - ${({ borderRadius }) => borderRadius["3"]}
    );
    box-shadow: inset 0 0 0 1px ${({ tokens }) => tokens.core.glass010};
  }

  wui-icon-box {
    position: absolute;
    right: calc(${({ spacing }) => spacing["1"]} * -1);
    bottom: calc(${({ spacing }) => spacing["1"]} * -1);
    opacity: 0;
    transform: scale(0.5);
    transition:
      opacity ${({ durations }) => durations["lg"]} ${({ easings }) => easings["ease-out-power-2"]},
      transform ${({ durations }) => durations["lg"]}
        ${({ easings }) => easings["ease-out-power-2"]};
    will-change: opacity, transform;
  }

  wui-text[align='center'] {
    width: 100%;
    padding: 0px ${({ spacing }) => spacing["4"]};
  }

  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }

  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms ${({ easings }) => easings["ease-out-power-2"]} both;
  }

  [data-retry='false'] wui-link {
    display: none;
  }

  [data-retry='true'] wui-link {
    display: block;
    opacity: 1;
  }

  wui-link {
    padding: ${({ spacing }) => spacing["01"]} ${({ spacing }) => spacing["2"]};
  }

  .capitalize {
    text-transform: capitalize;
  }
`;
var __decorate$X = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
const chainIconNameMap = {
  eip155: "eth",
  solana: "solana",
  bip122: "bitcoin",
  polkadot: void 0
};
let W3mSwitchActiveChainView = class W3mSwitchActiveChainView2 extends i {
  constructor() {
    super(...arguments);
    this.unsubscribe = [];
    this.switchToChain = RouterController.state.data?.switchToChain;
    this.caipNetwork = RouterController.state.data?.network;
    this.activeChain = ChainController.state.activeChain;
  }
  firstUpdated() {
    this.unsubscribe.push(ChainController.subscribeKey("activeChain", (val) => this.activeChain = val));
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    const switchedChainNameString = this.switchToChain ? ConstantsUtil$1.CHAIN_NAME_MAP[this.switchToChain] : "supported";
    if (!this.switchToChain) {
      return null;
    }
    const nextChainName = ConstantsUtil$1.CHAIN_NAME_MAP[this.switchToChain];
    return T`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["4", "2", "2", "2"]}
        gap="4"
      >
        <wui-flex justifyContent="center" flexDirection="column" alignItems="center" gap="2">
          <wui-visual
            size="md"
            name=${o(chainIconNameMap[this.switchToChain])}
          ></wui-visual>
          <wui-flex gap="2" flexDirection="column" alignItems="center">
            <wui-text
              data-testid=${`w3m-switch-active-chain-to-${nextChainName}`}
              variant="lg-regular"
              color="primary"
              align="center"
              >Switch to <span class="capitalize">${nextChainName}</span></wui-text
            >
            <wui-text variant="md-regular" color="secondary" align="center">
              Connected wallet doesn't support connecting to ${switchedChainNameString} chain. You
              need to connect with a different wallet.
            </wui-text>
          </wui-flex>
          <wui-button
            data-testid="w3m-switch-active-chain-button"
            size="md"
            @click=${this.switchActiveChain.bind(this)}
            >Switch</wui-button
          >
        </wui-flex>
      </wui-flex>
    `;
  }
  async switchActiveChain() {
    if (!this.switchToChain) {
      return;
    }
    ChainController.setIsSwitchingNamespace(true);
    ConnectorController.setFilterByNamespace(this.switchToChain);
    if (this.caipNetwork) {
      await ChainController.switchActiveNetwork(this.caipNetwork);
    } else {
      ChainController.setActiveNamespace(this.switchToChain);
    }
    RouterController.reset("Connect");
  }
};
W3mSwitchActiveChainView.styles = styles$L;
__decorate$X([
  n()
], W3mSwitchActiveChainView.prototype, "activeChain", void 0);
W3mSwitchActiveChainView = __decorate$X([
  customElement("w3m-switch-active-chain-view")
], W3mSwitchActiveChainView);
var __decorate$W = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
const data = [
  {
    images: ["network", "layers", "system"],
    title: "The system’s nuts and bolts",
    text: "A network is what brings the blockchain to life, as this technical infrastructure allows apps to access the ledger and smart contract services."
  },
  {
    images: ["noun", "defiAlt", "dao"],
    title: "Designed for different uses",
    text: "Each network is designed differently, and may therefore suit certain apps and experiences."
  }
];
let W3mWhatIsANetworkView = class W3mWhatIsANetworkView2 extends i {
  render() {
    return T`
      <wui-flex
        flexDirection="column"
        .padding=${["6", "5", "5", "5"]}
        alignItems="center"
        gap="5"
      >
        <w3m-help-widget .data=${data}></w3m-help-widget>
        <wui-button
          variant="accent-primary"
          size="md"
          @click=${() => {
      CoreHelperUtil.openHref("https://ethereum.org/en/developers/docs/networks/", "_blank");
    }}
        >
          Learn more
          <wui-icon color="inherit" slot="iconRight" name="externalLink"></wui-icon>
        </wui-button>
      </wui-flex>
    `;
  }
};
W3mWhatIsANetworkView = __decorate$W([
  customElement("w3m-what-is-a-network-view")
], W3mWhatIsANetworkView);
const styles$K = i$1`
  :host > wui-flex {
    max-height: clamp(360px, 540px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
  }

  :host > wui-flex::-webkit-scrollbar {
    display: none;
  }
`;
var __decorate$V = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mUnsupportedChainView = class W3mUnsupportedChainView2 extends i {
  constructor() {
    super();
    this.swapUnsupportedChain = RouterController.state.data?.swapUnsupportedChain;
    this.unsubscribe = [];
    this.disconnecting = false;
    this.remoteFeatures = OptionsController.state.remoteFeatures;
    this.unsubscribe.push(AssetController.subscribeNetworkImages(() => this.requestUpdate()), OptionsController.subscribeKey("remoteFeatures", (val) => {
      this.remoteFeatures = val;
    }));
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    return T`
      <wui-flex class="container" flexDirection="column" gap="0">
        <wui-flex
          class="container"
          flexDirection="column"
          .padding=${["3", "5", "2", "5"]}
          alignItems="center"
          gap="5"
        >
          ${this.descriptionTemplate()}
        </wui-flex>

        <wui-flex flexDirection="column" padding="3" gap="2"> ${this.networksTemplate()} </wui-flex>

        <wui-separator text="or"></wui-separator>
        <wui-flex flexDirection="column" padding="3" gap="2">
          <wui-list-item
            variant="icon"
            iconVariant="overlay"
            icon="signOut"
            ?chevron=${false}
            .loading=${this.disconnecting}
            @click=${this.onDisconnect.bind(this)}
            data-testid="disconnect-button"
          >
            <wui-text variant="md-medium" color="secondary">Disconnect</wui-text>
          </wui-list-item>
        </wui-flex>
      </wui-flex>
    `;
  }
  descriptionTemplate() {
    if (this.swapUnsupportedChain) {
      return T`
        <wui-text variant="sm-regular" color="secondary" align="center">
          The swap feature doesn’t support your current network. Switch to an available option to
          continue.
        </wui-text>
      `;
    }
    return T`
      <wui-text variant="sm-regular" color="secondary" align="center">
        This app doesn’t support your current network. Switch to an available option to continue.
      </wui-text>
    `;
  }
  networksTemplate() {
    const requestedCaipNetworks = ChainController.getAllRequestedCaipNetworks();
    const approvedCaipNetworkIds = ChainController.getAllApprovedCaipNetworkIds();
    const sortedNetworks = CoreHelperUtil.sortRequestedNetworks(approvedCaipNetworkIds, requestedCaipNetworks);
    const filteredNetworks = this.swapUnsupportedChain ? sortedNetworks.filter((network) => ConstantsUtil$2.SWAP_SUPPORTED_NETWORKS.includes(network.caipNetworkId)) : sortedNetworks;
    return filteredNetworks.map((network) => T`
        <wui-list-network
          imageSrc=${o(AssetUtil.getNetworkImage(network))}
          name=${network.name ?? "Unknown"}
          @click=${() => this.onSwitchNetwork(network)}
        >
        </wui-list-network>
      `);
  }
  async onDisconnect() {
    try {
      this.disconnecting = true;
      const namespace = ChainController.state.activeChain;
      const connectionsByNamespace = ConnectionController.getConnections(namespace);
      const hasConnections = connectionsByNamespace.length > 0;
      const connectorId = namespace && ConnectorController.state.activeConnectorIds[namespace];
      const isMultiWalletEnabled = this.remoteFeatures?.multiWallet;
      await ConnectionController.disconnect(isMultiWalletEnabled ? { id: connectorId, namespace } : {});
      if (hasConnections && isMultiWalletEnabled) {
        RouterController.push("ProfileWallets");
        SnackController.showSuccess("Wallet deleted");
      }
    } catch {
      EventsController.sendEvent({
        type: "track",
        event: "DISCONNECT_ERROR",
        properties: { message: "Failed to disconnect" }
      });
      SnackController.showError("Failed to disconnect");
    } finally {
      this.disconnecting = false;
    }
  }
  async onSwitchNetwork(network) {
    const caipAddress = ChainController.getActiveCaipAddress();
    const approvedCaipNetworkIds = ChainController.getAllApprovedCaipNetworkIds();
    const shouldSupportAllNetworks = ChainController.getNetworkProp("supportsAllNetworks", network.chainNamespace);
    const routerData = RouterController.state.data;
    if (caipAddress) {
      if (approvedCaipNetworkIds?.includes(network.caipNetworkId)) {
        await ChainController.switchActiveNetwork(network);
      } else if (shouldSupportAllNetworks) {
        RouterController.push("SwitchNetwork", { ...routerData, network });
      } else {
        RouterController.push("SwitchNetwork", { ...routerData, network });
      }
    } else if (!caipAddress) {
      ChainController.setActiveCaipNetwork(network);
      RouterController.push("Connect");
    }
  }
};
W3mUnsupportedChainView.styles = styles$K;
__decorate$V([
  r()
], W3mUnsupportedChainView.prototype, "disconnecting", void 0);
__decorate$V([
  r()
], W3mUnsupportedChainView.prototype, "remoteFeatures", void 0);
W3mUnsupportedChainView = __decorate$V([
  customElement("w3m-unsupported-chain-view")
], W3mUnsupportedChainView);
const styles$J = i$1`
  :host > wui-flex {
    max-height: clamp(360px, 540px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
  }

  :host > wui-flex::-webkit-scrollbar {
    display: none;
  }
`;
var __decorate$U = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mWalletCompatibleNetworksView = class W3mWalletCompatibleNetworksView2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    return T` <wui-flex flexDirection="column" .padding=${["2", "3", "3", "3"]} gap="2">
      <wui-banner
        icon="warningCircle"
        text="You can only receive assets on these networks"
      ></wui-banner>
      ${this.networkTemplate()}
    </wui-flex>`;
  }
  networkTemplate() {
    const requestedCaipNetworks = ChainController.getAllRequestedCaipNetworks();
    const approvedCaipNetworkIds = ChainController.getAllApprovedCaipNetworkIds();
    const caipNetwork = ChainController.state.activeCaipNetwork;
    const isNetworkEnabledForSmartAccounts = ChainController.checkIfSmartAccountEnabled();
    let sortedNetworks = CoreHelperUtil.sortRequestedNetworks(approvedCaipNetworkIds, requestedCaipNetworks);
    if (isNetworkEnabledForSmartAccounts && getPreferredAccountType(caipNetwork?.chainNamespace) === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT) {
      if (!caipNetwork) {
        return null;
      }
      sortedNetworks = [caipNetwork];
    }
    const namespaceNetworks = sortedNetworks.filter((network) => network.chainNamespace === caipNetwork?.chainNamespace);
    return namespaceNetworks.map((network) => T`
        <wui-list-network
          imageSrc=${o(AssetUtil.getNetworkImage(network))}
          name=${network.name ?? "Unknown"}
          ?transparent=${true}
        >
        </wui-list-network>
      `);
  }
};
W3mWalletCompatibleNetworksView.styles = styles$J;
W3mWalletCompatibleNetworksView = __decorate$U([
  customElement("w3m-wallet-compatible-networks-view")
], W3mWalletCompatibleNetworksView);
const styles$I = css`
  :host {
    display: flex;
    justify-content: center;
    gap: ${({ spacing }) => spacing["4"]};
  }

  wui-visual-thumbnail:nth-child(1) {
    z-index: 1;
  }
`;
var __decorate$T = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mSIWXSignMessageThumbnails = class W3mSIWXSignMessageThumbnails2 extends i {
  constructor() {
    super(...arguments);
    this.dappImageUrl = OptionsController.state.metadata?.icons;
    this.walletImageUrl = ChainController.getAccountData()?.connectedWalletInfo?.icon;
  }
  firstUpdated() {
    const visuals = this.shadowRoot?.querySelectorAll("wui-visual-thumbnail");
    if (visuals?.[0]) {
      this.createAnimation(visuals[0], "translate(18px)");
    }
    if (visuals?.[1]) {
      this.createAnimation(visuals[1], "translate(-18px)");
    }
  }
  render() {
    return T`
      <wui-visual-thumbnail
        ?borderRadiusFull=${true}
        .imageSrc=${this.dappImageUrl?.[0]}
      ></wui-visual-thumbnail>
      <wui-visual-thumbnail .imageSrc=${this.walletImageUrl}></wui-visual-thumbnail>
    `;
  }
  createAnimation(element, translation) {
    element.animate([{ transform: "translateX(0px)" }, { transform: translation }], {
      duration: 1600,
      easing: "cubic-bezier(0.56, 0, 0.48, 1)",
      direction: "alternate",
      iterations: Infinity
    });
  }
};
W3mSIWXSignMessageThumbnails.styles = styles$I;
W3mSIWXSignMessageThumbnails = __decorate$T([
  customElement("w3m-siwx-sign-message-thumbnails")
], W3mSIWXSignMessageThumbnails);
var __decorate$S = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mSIWXSignMessageView = class W3mSIWXSignMessageView2 extends i {
  constructor() {
    super(...arguments);
    this.dappName = OptionsController.state.metadata?.name;
    this.isCancelling = false;
    this.isSigning = false;
  }
  render() {
    return T`
      <wui-flex justifyContent="center" .padding=${["8", "0", "6", "0"]}>
        <w3m-siwx-sign-message-thumbnails></w3m-siwx-sign-message-thumbnails>
      </wui-flex>
      <wui-flex .padding=${["0", "20", "5", "20"]} gap="3" justifyContent="space-between">
        <wui-text variant="lg-medium" align="center" color="primary"
          >${this.dappName ?? "Dapp"} needs to connect to your wallet</wui-text
        >
      </wui-flex>
      <wui-flex .padding=${["0", "10", "4", "10"]} gap="3" justifyContent="space-between">
        <wui-text variant="md-regular" align="center" color="secondary"
          >Sign this message to prove you own this wallet and proceed. Canceling will disconnect
          you.</wui-text
        >
      </wui-flex>
      <wui-flex .padding=${["4", "5", "5", "5"]} gap="3" justifyContent="space-between">
        <wui-button
          size="lg"
          borderRadius="xs"
          fullWidth
          variant="neutral-secondary"
          ?loading=${this.isCancelling}
          @click=${this.onCancel.bind(this)}
          data-testid="w3m-connecting-siwe-cancel"
        >
          ${this.isCancelling ? "Cancelling..." : "Cancel"}
        </wui-button>
        <wui-button
          size="lg"
          borderRadius="xs"
          fullWidth
          variant="neutral-primary"
          @click=${this.onSign.bind(this)}
          ?loading=${this.isSigning}
          data-testid="w3m-connecting-siwe-sign"
        >
          ${this.isSigning ? "Signing..." : "Sign"}
        </wui-button>
      </wui-flex>
    `;
  }
  async onSign() {
    this.isSigning = true;
    try {
      await SIWXUtil.requestSignMessage();
    } catch (error) {
      if (error instanceof Error && error.message.includes("OTP is required")) {
        SnackController.showError({
          message: "Something went wrong. We need to verify your account again."
        });
        RouterController.replace("DataCapture");
        return;
      }
      throw error;
    } finally {
      this.isSigning = false;
    }
  }
  async onCancel() {
    this.isCancelling = true;
    await SIWXUtil.cancelSignMessage().finally(() => this.isCancelling = false);
  }
};
__decorate$S([
  r()
], W3mSIWXSignMessageView.prototype, "isCancelling", void 0);
__decorate$S([
  r()
], W3mSIWXSignMessageView.prototype, "isSigning", void 0);
W3mSIWXSignMessageView = __decorate$S([
  customElement("w3m-siwx-sign-message-view")
], W3mSIWXSignMessageView);
const index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get AppKitAccountButton() {
    return AppKitAccountButton;
  },
  get AppKitButton() {
    return AppKitButton;
  },
  get AppKitConnectButton() {
    return AppKitConnectButton;
  },
  get AppKitNetworkButton() {
    return AppKitNetworkButton;
  },
  get W3mAccountButton() {
    return W3mAccountButton;
  },
  get W3mAccountSettingsView() {
    return W3mAccountSettingsView;
  },
  get W3mAccountView() {
    return W3mAccountView;
  },
  get W3mAllWalletsView() {
    return W3mAllWalletsView;
  },
  get W3mButton() {
    return W3mButton;
  },
  get W3mChooseAccountNameView() {
    return W3mChooseAccountNameView;
  },
  get W3mConnectButton() {
    return W3mConnectButton;
  },
  get W3mConnectView() {
    return W3mConnectView;
  },
  get W3mConnectWalletsView() {
    return W3mConnectWalletsView;
  },
  get W3mConnectingExternalView() {
    return W3mConnectingExternalView;
  },
  get W3mConnectingMultiChainView() {
    return W3mConnectingMultiChainView;
  },
  get W3mConnectingWcBasicView() {
    return W3mConnectingWcBasicView;
  },
  get W3mConnectingWcView() {
    return W3mConnectingWcView;
  },
  get W3mDownloadsView() {
    return W3mDownloadsView;
  },
  get W3mFooter() {
    return W3mFooter;
  },
  get W3mFundWalletView() {
    return W3mFundWalletView;
  },
  get W3mGetWalletView() {
    return W3mGetWalletView;
  },
  get W3mNetworkButton() {
    return W3mNetworkButton;
  },
  get W3mNetworkSwitchView() {
    return W3mNetworkSwitchView;
  },
  get W3mNetworksView() {
    return W3mNetworksView;
  },
  get W3mProfileWalletsView() {
    return W3mProfileWalletsView;
  },
  get W3mRouter() {
    return W3mRouter;
  },
  get W3mSIWXSignMessageView() {
    return W3mSIWXSignMessageView;
  },
  get W3mSwitchActiveChainView() {
    return W3mSwitchActiveChainView;
  },
  get W3mUnsupportedChainView() {
    return W3mUnsupportedChainView;
  },
  get W3mWalletCompatibleNetworksView() {
    return W3mWalletCompatibleNetworksView;
  },
  get W3mWhatIsANetworkView() {
    return W3mWhatIsANetworkView;
  },
  get W3mWhatIsAWalletView() {
    return W3mWhatIsAWalletView;
  }
});
const styles$H = i$1`
  div {
    width: 100%;
  }

  [data-ready='false'] {
    transform: scale(1.05);
  }

  @media (max-width: 430px) {
    [data-ready='false'] {
      transform: translateY(-50px);
    }
  }
`;
var __decorate$R = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
const PAGE_HEIGHT = 600;
const PAGE_WIDTH = 360;
const HEADER_HEIGHT$1 = 64;
let W3mApproveTransactionView = class W3mApproveTransactionView2 extends i {
  constructor() {
    super();
    this.bodyObserver = void 0;
    this.unsubscribe = [];
    this.iframe = document.getElementById("w3m-iframe");
    this.ready = false;
    this.unsubscribe.push(...[
      ModalController.subscribeKey("open", (isOpen) => {
        if (!isOpen) {
          this.onHideIframe();
        }
      }),
      ModalController.subscribeKey("shake", (val) => {
        if (val) {
          this.iframe.style.animation = `w3m-shake 500ms var(--apkt-easings-ease-out-power-2)`;
        } else {
          this.iframe.style.animation = "none";
        }
      })
    ]);
  }
  disconnectedCallback() {
    this.onHideIframe();
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
    this.bodyObserver?.unobserve(window.document.body);
  }
  async firstUpdated() {
    await this.syncTheme();
    this.iframe.style.display = "block";
    const container = this?.renderRoot?.querySelector("div");
    this.bodyObserver = new ResizeObserver((entries) => {
      const contentBoxSize = entries?.[0]?.contentBoxSize;
      const width = contentBoxSize?.[0]?.inlineSize;
      this.iframe.style.height = `${PAGE_HEIGHT}px`;
      container.style.height = `${PAGE_HEIGHT}px`;
      if (OptionsController.state.enableEmbedded) {
        this.updateFrameSizeForEmbeddedMode();
      } else if (width && width <= 430) {
        this.iframe.style.width = "100%";
        this.iframe.style.left = "0px";
        this.iframe.style.bottom = "0px";
        this.iframe.style.top = "unset";
        this.onShowIframe();
      } else {
        this.iframe.style.width = `${PAGE_WIDTH}px`;
        this.iframe.style.left = `calc(50% - ${PAGE_WIDTH / 2}px)`;
        this.iframe.style.top = `calc(50% - ${PAGE_HEIGHT / 2}px + ${HEADER_HEIGHT$1 / 2}px)`;
        this.iframe.style.bottom = "unset";
        this.onShowIframe();
      }
    });
    this.bodyObserver.observe(window.document.body);
  }
  render() {
    return T`<div data-ready=${this.ready} id="w3m-frame-container"></div>`;
  }
  onShowIframe() {
    const isMobile = window.innerWidth <= 430;
    this.ready = true;
    this.iframe.style.animation = isMobile ? "w3m-iframe-zoom-in-mobile 200ms var(--apkt-easings-ease-out-power-2)" : "w3m-iframe-zoom-in 200ms var(--apkt-easings-ease-out-power-2)";
  }
  onHideIframe() {
    this.iframe.style.display = "none";
    this.iframe.style.animation = "w3m-iframe-fade-out 200ms var(--apkt-easings-ease-out-power-2)";
  }
  async syncTheme() {
    const authConnector = ConnectorController.getAuthConnector();
    if (authConnector) {
      const themeMode = ThemeController.getSnapshot().themeMode;
      const themeVariables = ThemeController.getSnapshot().themeVariables;
      await authConnector.provider.syncTheme({
        themeVariables,
        w3mThemeVariables: getW3mThemeVariables(themeVariables, themeMode)
      });
    }
  }
  async updateFrameSizeForEmbeddedMode() {
    const container = this?.renderRoot?.querySelector("div");
    await new Promise((resolve) => {
      setTimeout(resolve, 300);
    });
    const rect = this.getBoundingClientRect();
    container.style.width = "100%";
    this.iframe.style.left = `${rect.left}px`;
    this.iframe.style.top = `${rect.top}px`;
    this.iframe.style.width = `${rect.width}px`;
    this.iframe.style.height = `${rect.height}px`;
    this.onShowIframe();
  }
};
W3mApproveTransactionView.styles = styles$H;
__decorate$R([
  r()
], W3mApproveTransactionView.prototype, "ready", void 0);
W3mApproveTransactionView = __decorate$R([
  customElement("w3m-approve-transaction-view")
], W3mApproveTransactionView);
var __decorate$Q = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mUpgradeWalletView = class W3mUpgradeWalletView2 extends i {
  render() {
    return T`
      <wui-flex flexDirection="column" alignItems="center" gap="5" padding="5">
        <wui-text variant="md-regular" color="primary">Follow the instructions on</wui-text>
        <wui-semantic-chip
          icon="externalLink"
          variant="fill"
          text=${ConstantsUtil$2.SECURE_SITE_DASHBOARD}
          href=${ConstantsUtil$2.SECURE_SITE_DASHBOARD}
          imageSrc=${ConstantsUtil$2.SECURE_SITE_FAVICON}
          data-testid="w3m-secure-website-button"
        >
        </wui-semantic-chip>
        <wui-text variant="sm-regular" color="secondary">
          You will have to reconnect for security reasons
        </wui-text>
      </wui-flex>
    `;
  }
};
W3mUpgradeWalletView = __decorate$Q([
  customElement("w3m-upgrade-wallet-view")
], W3mUpgradeWalletView);
var __decorate$P = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mSmartAccountSettingsView = class W3mSmartAccountSettingsView2 extends i {
  constructor() {
    super(...arguments);
    this.loading = false;
    this.switched = false;
    this.text = "";
    this.network = ChainController.state.activeCaipNetwork;
  }
  render() {
    return T`
      <wui-flex flexDirection="column" gap="2" .padding=${["6", "4", "3", "4"]}>
        ${this.togglePreferredAccountTypeTemplate()} ${this.toggleSmartAccountVersionTemplate()}
      </wui-flex>
    `;
  }
  toggleSmartAccountVersionTemplate() {
    return T`
      <w3m-tooltip-trigger text="Changing the smart account version will reload the page">
        <wui-list-item
          icon=${this.isV6() ? "arrowTop" : "arrowBottom"}
          ?rounded=${true}
          ?chevron=${true}
          data-testid="account-toggle-smart-account-version"
          @click=${this.toggleSmartAccountVersion.bind(this)}
        >
          <wui-text variant="lg-regular" color="primary"
            >Force Smart Account Version ${this.isV6() ? "7" : "6"}</wui-text
          >
        </wui-list-item>
      </w3m-tooltip-trigger>
    `;
  }
  isV6() {
    const currentVersion = W3mFrameStorage.get("dapp_smart_account_version") || "v6";
    return currentVersion === "v6";
  }
  toggleSmartAccountVersion() {
    W3mFrameStorage.set("dapp_smart_account_version", this.isV6() ? "v7" : "v6");
    if (typeof window !== "undefined") {
      window?.location?.reload();
    }
  }
  togglePreferredAccountTypeTemplate() {
    const namespace = this.network?.chainNamespace;
    const isNetworkEnabled = ChainController.checkIfSmartAccountEnabled();
    const connectorId = ConnectorController.getConnectorId(namespace);
    const authConnector = ConnectorController.getAuthConnector();
    if (!authConnector || connectorId !== ConstantsUtil$1.CONNECTOR_ID.AUTH || !isNetworkEnabled) {
      return null;
    }
    if (!this.switched) {
      this.text = getPreferredAccountType(namespace) === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT ? "Switch to your EOA" : "Switch to your Smart Account";
    }
    return T`
      <wui-list-item
        icon="swapHorizontal"
        ?rounded=${true}
        ?chevron=${true}
        ?loading=${this.loading}
        @click=${this.changePreferredAccountType.bind(this)}
        data-testid="account-toggle-preferred-account-type"
      >
        <wui-text variant="lg-regular" color="primary">${this.text}</wui-text>
      </wui-list-item>
    `;
  }
  async changePreferredAccountType() {
    const namespace = this.network?.chainNamespace;
    const isSmartAccountEnabled = ChainController.checkIfSmartAccountEnabled();
    const accountTypeTarget = getPreferredAccountType(namespace) === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT || !isSmartAccountEnabled ? W3mFrameRpcConstants.ACCOUNT_TYPES.EOA : W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT;
    const authConnector = ConnectorController.getAuthConnector();
    if (!authConnector) {
      return;
    }
    this.loading = true;
    await ConnectionController.setPreferredAccountType(accountTypeTarget, namespace);
    this.text = accountTypeTarget === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT ? "Switch to your EOA" : "Switch to your Smart Account";
    this.switched = true;
    SendController.resetSend();
    this.loading = false;
    this.requestUpdate();
  }
};
__decorate$P([
  r()
], W3mSmartAccountSettingsView.prototype, "loading", void 0);
__decorate$P([
  r()
], W3mSmartAccountSettingsView.prototype, "switched", void 0);
__decorate$P([
  r()
], W3mSmartAccountSettingsView.prototype, "text", void 0);
__decorate$P([
  r()
], W3mSmartAccountSettingsView.prototype, "network", void 0);
W3mSmartAccountSettingsView = __decorate$P([
  customElement("w3m-smart-account-settings-view")
], W3mSmartAccountSettingsView);
const styles$G = css`
  wui-flex {
    width: 100%;
  }

  .suggestion {
    background-color: ${({ tokens }) => tokens.theme.foregroundPrimary};
    border-radius: ${({ borderRadius }) => borderRadius[4]};
  }

  .suggestion:hover:not(:disabled) {
    cursor: pointer;
    border: none;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${({ tokens }) => tokens.theme.foregroundSecondary};
    border-radius: ${({ borderRadius }) => borderRadius[6]};
    padding: ${({ spacing }) => spacing[4]};
  }

  .suggestion:disabled {
    opacity: 0.5;
    cursor: default;
  }

  .suggestion:focus-visible:not(:disabled) {
    box-shadow: 0 0 0 4px ${({ tokens }) => tokens.core.foregroundAccent040};
    background-color: ${({ tokens }) => tokens.theme.foregroundSecondary};
  }

  .suggested-name {
    max-width: 75%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  form {
    width: 100%;
    position: relative;
  }

  .input-submit-button,
  .input-loading-spinner {
    position: absolute;
    top: 22px;
    transform: translateY(-50%);
    right: 10px;
  }
`;
var __decorate$O = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mRegisterAccountNameView = class W3mRegisterAccountNameView2 extends i {
  constructor() {
    super();
    this.formRef = e$1();
    this.usubscribe = [];
    this.name = "";
    this.error = "";
    this.loading = EnsController.state.loading;
    this.suggestions = EnsController.state.suggestions;
    this.profileName = ChainController.getAccountData()?.profileName;
    this.onDebouncedNameInputChange = CoreHelperUtil.debounce((value) => {
      if (value.length < 4) {
        this.error = "Name must be at least 4 characters long";
      } else if (!HelpersUtil.isValidReownName(value)) {
        this.error = "The value is not a valid username";
      } else {
        this.error = "";
        EnsController.getSuggestions(value);
      }
    });
    this.usubscribe.push(...[
      EnsController.subscribe((val) => {
        this.suggestions = val.suggestions;
        this.loading = val.loading;
      }),
      ChainController.subscribeChainProp("accountState", (val) => {
        this.profileName = val?.profileName;
        if (val?.profileName) {
          this.error = "You already own a name";
        }
      })
    ]);
  }
  firstUpdated() {
    this.formRef.value?.addEventListener("keydown", this.onEnterKey.bind(this));
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.usubscribe.forEach((unsub) => unsub());
    this.formRef.value?.removeEventListener("keydown", this.onEnterKey.bind(this));
  }
  render() {
    return T`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="4"
        .padding=${["1", "3", "4", "3"]}
      >
        <form ${n$1(this.formRef)} @submit=${this.onSubmitName.bind(this)}>
          <wui-ens-input
            @inputChange=${this.onNameInputChange.bind(this)}
            .errorMessage=${this.error}
            .value=${this.name}
            .onKeyDown=${this.onKeyDown.bind(this)}
          >
          </wui-ens-input>
          ${this.submitButtonTemplate()}
          <input type="submit" hidden />
        </form>
        ${this.templateSuggestions()}
      </wui-flex>
    `;
  }
  submitButtonTemplate() {
    const isRegistered = this.suggestions.find((s) => s.name?.split(".")?.[0] === this.name && s.registered);
    if (this.loading) {
      return T`<wui-loading-spinner
        class="input-loading-spinner"
        color="secondary"
      ></wui-loading-spinner>`;
    }
    const reownName = `${this.name}${ConstantsUtil$1.WC_NAME_SUFFIX}`;
    return T`
      <wui-icon-link
        ?disabled=${Boolean(isRegistered)}
        class="input-submit-button"
        size="sm"
        icon="chevronRight"
        iconColor=${isRegistered ? "default" : "accent-primary"}
        @click=${() => this.onSubmitName(reownName)}
      >
      </wui-icon-link>
    `;
  }
  onNameInputChange(event) {
    const value = HelpersUtil.validateReownName(event.detail || "");
    this.name = value;
    this.onDebouncedNameInputChange(value);
  }
  onKeyDown(event) {
    if (event.key.length === 1 && !HelpersUtil.isValidReownName(event.key)) {
      event.preventDefault();
    }
  }
  templateSuggestions() {
    if (!this.name || this.name.length < 4 || this.error) {
      return null;
    }
    return T`<wui-flex flexDirection="column" gap="1" alignItems="center">
      ${this.suggestions.map((suggestion) => T`<wui-account-name-suggestion-item
            name=${suggestion.name}
            ?registered=${suggestion.registered}
            ?loading=${this.loading}
            ?disabled=${suggestion.registered || this.loading}
            data-testid="account-name-suggestion"
            @click=${() => this.onSubmitName(suggestion.name)}
          ></wui-account-name-suggestion-item>`)}
    </wui-flex>`;
  }
  isAllowedToSubmit(name) {
    const pureName = name.split(".")?.[0];
    const isRegistered = this.suggestions.find((s) => s.name?.split(".")?.[0] === pureName && s.registered);
    return !this.loading && !this.error && !this.profileName && pureName && EnsController.validateName(pureName) && !isRegistered;
  }
  async onSubmitName(name) {
    try {
      if (!this.isAllowedToSubmit(name)) {
        return;
      }
      EventsController.sendEvent({
        type: "track",
        event: "REGISTER_NAME_INITIATED",
        properties: {
          isSmartAccount: getPreferredAccountType(ChainController.state.activeChain) === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT,
          ensName: name
        }
      });
      await EnsController.registerName(name);
      EventsController.sendEvent({
        type: "track",
        event: "REGISTER_NAME_SUCCESS",
        properties: {
          isSmartAccount: getPreferredAccountType(ChainController.state.activeChain) === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT,
          ensName: name
        }
      });
    } catch (error) {
      SnackController.showError(error.message);
      EventsController.sendEvent({
        type: "track",
        event: "REGISTER_NAME_ERROR",
        properties: {
          isSmartAccount: getPreferredAccountType(ChainController.state.activeChain) === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT,
          ensName: name,
          error: CoreHelperUtil.parseError(error)
        }
      });
    }
  }
  onEnterKey(event) {
    if (event.key === "Enter" && this.name && this.isAllowedToSubmit(this.name)) {
      const reownName = `${this.name}${ConstantsUtil$1.WC_NAME_SUFFIX}`;
      this.onSubmitName(reownName);
    }
  }
};
W3mRegisterAccountNameView.styles = styles$G;
__decorate$O([
  n()
], W3mRegisterAccountNameView.prototype, "errorMessage", void 0);
__decorate$O([
  r()
], W3mRegisterAccountNameView.prototype, "name", void 0);
__decorate$O([
  r()
], W3mRegisterAccountNameView.prototype, "error", void 0);
__decorate$O([
  r()
], W3mRegisterAccountNameView.prototype, "loading", void 0);
__decorate$O([
  r()
], W3mRegisterAccountNameView.prototype, "suggestions", void 0);
__decorate$O([
  r()
], W3mRegisterAccountNameView.prototype, "profileName", void 0);
W3mRegisterAccountNameView = __decorate$O([
  customElement("w3m-register-account-name-view")
], W3mRegisterAccountNameView);
const styles$F = i$1`
  .continue-button-container {
    width: 100%;
  }
`;
var __decorate$N = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mRegisterAccountNameSuccess = class W3mRegisterAccountNameSuccess2 extends i {
  render() {
    return T`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="6"
        .padding=${["0", "0", "4", "0"]}
      >
        ${this.onboardingTemplate()} ${this.buttonsTemplate()}
        <wui-link
          @click=${() => {
      CoreHelperUtil.openHref(NavigationUtil.URLS.FAQ, "_blank");
    }}
        >
          Learn more
          <wui-icon color="inherit" slot="iconRight" name="externalLink"></wui-icon>
        </wui-link>
      </wui-flex>
    `;
  }
  onboardingTemplate() {
    return T` <wui-flex
      flexDirection="column"
      gap="6"
      alignItems="center"
      .padding=${["0", "6", "0", "6"]}
    >
      <wui-flex gap="3" alignItems="center" justifyContent="center">
        <wui-icon-box size="xl" color="success" icon="checkmark"></wui-icon-box>
      </wui-flex>
      <wui-flex flexDirection="column" alignItems="center" gap="3">
        <wui-text align="center" variant="md-medium" color="primary">
          Account name chosen successfully
        </wui-text>
        <wui-text align="center" variant="md-regular" color="primary">
          You can now fund your account and trade crypto
        </wui-text>
      </wui-flex>
    </wui-flex>`;
  }
  buttonsTemplate() {
    return T`<wui-flex
      .padding=${["0", "4", "0", "4"]}
      gap="3"
      class="continue-button-container"
    >
      <wui-button fullWidth size="lg" borderRadius="xs" @click=${this.redirectToAccount.bind(this)}
        >Let's Go!
      </wui-button>
    </wui-flex>`;
  }
  redirectToAccount() {
    RouterController.replace("Account");
  }
};
W3mRegisterAccountNameSuccess.styles = styles$F;
W3mRegisterAccountNameSuccess = __decorate$N([
  customElement("w3m-register-account-name-success-view")
], W3mRegisterAccountNameSuccess);
const embeddedWallet = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get W3mApproveTransactionView() {
    return W3mApproveTransactionView;
  },
  get W3mRegisterAccountNameSuccess() {
    return W3mRegisterAccountNameSuccess;
  },
  get W3mRegisterAccountNameView() {
    return W3mRegisterAccountNameView;
  },
  get W3mSmartAccountSettingsView() {
    return W3mSmartAccountSettingsView;
  },
  get W3mUpgradeWalletView() {
    return W3mUpgradeWalletView;
  }
});
const styles$E = i$1`
  wui-loading-spinner {
    margin: 9px auto;
  }

  .email-display,
  .email-display wui-text {
    max-width: 100%;
  }
`;
var __decorate$M = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
var W3mEmailOtpWidget_1;
let W3mEmailOtpWidget = W3mEmailOtpWidget_1 = class W3mEmailOtpWidget2 extends i {
  firstUpdated() {
    this.startOTPTimeout();
  }
  disconnectedCallback() {
    clearTimeout(this.OTPTimeout);
  }
  constructor() {
    super();
    this.loading = false;
    this.timeoutTimeLeft = W3mFrameHelpers.getTimeToNextEmailLogin();
    this.error = "";
    this.otp = "";
    this.email = RouterController.state.data?.email;
    this.authConnector = ConnectorController.getAuthConnector();
  }
  render() {
    if (!this.email) {
      throw new Error("w3m-email-otp-widget: No email provided");
    }
    const isResendDisabled = Boolean(this.timeoutTimeLeft);
    const footerLabels = this.getFooterLabels(isResendDisabled);
    return T`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["4", "0", "4", "0"]}
        gap="4"
      >
        <wui-flex
          class="email-display"
          flexDirection="column"
          alignItems="center"
          .padding=${["0", "5", "0", "5"]}
        >
          <wui-text variant="md-regular" color="primary" align="center">
            Enter the code we sent to
          </wui-text>
          <wui-text variant="md-medium" color="primary" lineClamp="1" align="center">
            ${this.email}
          </wui-text>
        </wui-flex>

        <wui-text variant="sm-regular" color="secondary">The code expires in 20 minutes</wui-text>

        ${this.loading ? T`<wui-loading-spinner size="xl" color="accent-primary"></wui-loading-spinner>` : T` <wui-flex flexDirection="column" alignItems="center" gap="2">
              <wui-otp
                dissabled
                length="6"
                @inputChange=${this.onOtpInputChange.bind(this)}
                .otp=${this.otp}
              ></wui-otp>
              ${this.error ? T`
                    <wui-text variant="sm-regular" align="center" color="error">
                      ${this.error}. Try Again
                    </wui-text>
                  ` : null}
            </wui-flex>`}

        <wui-flex alignItems="center" gap="2">
          <wui-text variant="sm-regular" color="secondary">${footerLabels.title}</wui-text>
          <wui-link @click=${this.onResendCode.bind(this)} .disabled=${isResendDisabled}>
            ${footerLabels.action}
          </wui-link>
        </wui-flex>
      </wui-flex>
    `;
  }
  startOTPTimeout() {
    this.timeoutTimeLeft = W3mFrameHelpers.getTimeToNextEmailLogin();
    this.OTPTimeout = setInterval(() => {
      if (this.timeoutTimeLeft > 0) {
        this.timeoutTimeLeft = W3mFrameHelpers.getTimeToNextEmailLogin();
      } else {
        clearInterval(this.OTPTimeout);
      }
    }, 1e3);
  }
  async onOtpInputChange(event) {
    try {
      if (!this.loading) {
        this.otp = event.detail;
        if (this.shouldSubmitOnOtpChange()) {
          this.loading = true;
          await this.onOtpSubmit?.(this.otp);
        }
      }
    } catch (error) {
      this.error = CoreHelperUtil.parseError(error);
      this.loading = false;
    }
  }
  async onResendCode() {
    try {
      if (this.onOtpResend) {
        if (!this.loading && !this.timeoutTimeLeft) {
          this.error = "";
          this.otp = "";
          const authConnector = ConnectorController.getAuthConnector();
          if (!authConnector || !this.email) {
            throw new Error("w3m-email-otp-widget: Unable to resend email");
          }
          this.loading = true;
          await this.onOtpResend(this.email);
          this.startOTPTimeout();
          SnackController.showSuccess("Code email resent");
        }
      } else if (this.onStartOver) {
        this.onStartOver();
      }
    } catch (error) {
      SnackController.showError(error);
    } finally {
      this.loading = false;
    }
  }
  getFooterLabels(isResendDisabled) {
    if (this.onStartOver) {
      return {
        title: "Something wrong?",
        action: `Try again ${isResendDisabled ? `in ${this.timeoutTimeLeft}s` : ""}`
      };
    }
    return {
      title: `Didn't receive it?`,
      action: `Resend ${isResendDisabled ? `in ${this.timeoutTimeLeft}s` : "Code"}`
    };
  }
  shouldSubmitOnOtpChange() {
    return this.authConnector && this.otp.length === W3mEmailOtpWidget_1.OTP_LENGTH;
  }
};
W3mEmailOtpWidget.OTP_LENGTH = 6;
W3mEmailOtpWidget.styles = styles$E;
__decorate$M([
  r()
], W3mEmailOtpWidget.prototype, "loading", void 0);
__decorate$M([
  r()
], W3mEmailOtpWidget.prototype, "timeoutTimeLeft", void 0);
__decorate$M([
  r()
], W3mEmailOtpWidget.prototype, "error", void 0);
W3mEmailOtpWidget = W3mEmailOtpWidget_1 = __decorate$M([
  customElement("w3m-email-otp-widget")
], W3mEmailOtpWidget);
var __decorate$L = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mEmailVerifyOtpView = class W3mEmailVerifyOtpView2 extends W3mEmailOtpWidget {
  constructor() {
    super(...arguments);
    this.onOtpSubmit = async (otp) => {
      try {
        if (this.authConnector) {
          const namespace = ChainController.state.activeChain;
          const connectionsByNamespace = ConnectionController.getConnections(namespace);
          const isMultiWalletEnabled = OptionsController.state.remoteFeatures?.multiWallet;
          const hasConnections = connectionsByNamespace.length > 0;
          await this.authConnector.provider.connectOtp({ otp });
          EventsController.sendEvent({ type: "track", event: "EMAIL_VERIFICATION_CODE_PASS" });
          if (namespace) {
            await ConnectionController.connectExternal(this.authConnector, namespace);
          } else {
            throw new Error("Active chain is not set on ChainController");
          }
          if (OptionsController.state.remoteFeatures?.emailCapture) {
            return;
          }
          if (OptionsController.state.siwx) {
            ModalController.close();
            return;
          }
          if (hasConnections && isMultiWalletEnabled) {
            RouterController.replace("ProfileWallets");
            SnackController.showSuccess("New Wallet Added");
            return;
          }
          ModalController.close();
        }
      } catch (error) {
        EventsController.sendEvent({
          type: "track",
          event: "EMAIL_VERIFICATION_CODE_FAIL",
          properties: { message: CoreHelperUtil.parseError(error) }
        });
        throw error;
      }
    };
    this.onOtpResend = async (email2) => {
      if (this.authConnector) {
        await this.authConnector.provider.connectEmail({ email: email2 });
        EventsController.sendEvent({ type: "track", event: "EMAIL_VERIFICATION_CODE_SENT" });
      }
    };
  }
};
W3mEmailVerifyOtpView = __decorate$L([
  customElement("w3m-email-verify-otp-view")
], W3mEmailVerifyOtpView);
const styles$D = css`
  wui-icon-box {
    height: ${({ spacing }) => spacing["16"]};
    width: ${({ spacing }) => spacing["16"]};
  }
`;
var __decorate$K = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mEmailVerifyDeviceView = class W3mEmailVerifyDeviceView2 extends i {
  constructor() {
    super();
    this.email = RouterController.state.data?.email;
    this.authConnector = ConnectorController.getAuthConnector();
    this.loading = false;
    this.listenForDeviceApproval();
  }
  render() {
    if (!this.email) {
      throw new Error("w3m-email-verify-device-view: No email provided");
    }
    if (!this.authConnector) {
      throw new Error("w3m-email-verify-device-view: No auth connector provided");
    }
    return T`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["6", "3", "6", "3"]}
        gap="4"
      >
        <wui-icon-box size="xl" color="accent-primary" icon="sealCheck"></wui-icon-box>

        <wui-flex flexDirection="column" alignItems="center" gap="3">
          <wui-flex flexDirection="column" alignItems="center">
            <wui-text variant="md-regular" color="primary">
              Approve the login link we sent to
            </wui-text>
            <wui-text variant="md-regular" color="primary"><b>${this.email}</b></wui-text>
          </wui-flex>

          <wui-text variant="sm-regular" color="secondary" align="center">
            The code expires in 20 minutes
          </wui-text>

          <wui-flex alignItems="center" id="w3m-resend-section" gap="2">
            <wui-text variant="sm-regular" color="primary" align="center">
              Didn't receive it?
            </wui-text>
            <wui-link @click=${this.onResendCode.bind(this)} .disabled=${this.loading}>
              Resend email
            </wui-link>
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `;
  }
  async listenForDeviceApproval() {
    if (this.authConnector) {
      try {
        await this.authConnector.provider.connectDevice();
        EventsController.sendEvent({ type: "track", event: "DEVICE_REGISTERED_FOR_EMAIL" });
        EventsController.sendEvent({ type: "track", event: "EMAIL_VERIFICATION_CODE_SENT" });
        RouterController.replace("EmailVerifyOtp", { email: this.email });
      } catch (error) {
        RouterController.goBack();
      }
    }
  }
  async onResendCode() {
    try {
      if (!this.loading) {
        if (!this.authConnector || !this.email) {
          throw new Error("w3m-email-login-widget: Unable to resend email");
        }
        this.loading = true;
        await this.authConnector.provider.connectEmail({ email: this.email });
        this.listenForDeviceApproval();
        SnackController.showSuccess("Code email resent");
      }
    } catch (error) {
      SnackController.showError(error);
    } finally {
      this.loading = false;
    }
  }
};
W3mEmailVerifyDeviceView.styles = styles$D;
__decorate$K([
  r()
], W3mEmailVerifyDeviceView.prototype, "loading", void 0);
W3mEmailVerifyDeviceView = __decorate$K([
  customElement("w3m-email-verify-device-view")
], W3mEmailVerifyDeviceView);
const styles$C = i$1`
  wui-email-input {
    width: 100%;
  }

  form {
    width: 100%;
    display: block;
    position: relative;
  }
`;
var __decorate$J = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mUpdateEmailWalletView = class W3mUpdateEmailWalletView2 extends i {
  constructor() {
    super(...arguments);
    this.formRef = e$1();
    this.initialEmail = RouterController.state.data?.email ?? "";
    this.redirectView = RouterController.state.data?.redirectView;
    this.email = "";
    this.loading = false;
  }
  firstUpdated() {
    this.formRef.value?.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this.onSubmitEmail(event);
      }
    });
  }
  render() {
    return T`
      <wui-flex flexDirection="column" padding="4" gap="4">
        <form ${n$1(this.formRef)} @submit=${this.onSubmitEmail.bind(this)}>
          <wui-email-input
            value=${this.initialEmail}
            .disabled=${this.loading}
            @inputChange=${this.onEmailInputChange.bind(this)}
          >
          </wui-email-input>
          <input type="submit" hidden />
        </form>
        ${this.buttonsTemplate()}
      </wui-flex>
    `;
  }
  onEmailInputChange(event) {
    this.email = event.detail;
  }
  async onSubmitEmail(event) {
    try {
      if (this.loading) {
        return;
      }
      this.loading = true;
      event.preventDefault();
      const authConnector = ConnectorController.getAuthConnector();
      if (!authConnector) {
        throw new Error("w3m-update-email-wallet: Auth connector not found");
      }
      const response = await authConnector.provider.updateEmail({ email: this.email });
      EventsController.sendEvent({ type: "track", event: "EMAIL_EDIT" });
      if (response.action === "VERIFY_SECONDARY_OTP") {
        RouterController.push("UpdateEmailSecondaryOtp", {
          email: this.initialEmail,
          newEmail: this.email,
          redirectView: this.redirectView
        });
      } else {
        RouterController.push("UpdateEmailPrimaryOtp", {
          email: this.initialEmail,
          newEmail: this.email,
          redirectView: this.redirectView
        });
      }
    } catch (error) {
      SnackController.showError(error);
      this.loading = false;
    }
  }
  buttonsTemplate() {
    const showSubmit = !this.loading && this.email.length > 3 && this.email !== this.initialEmail;
    if (!this.redirectView) {
      return T`
        <wui-button
          size="md"
          variant="accent-primary"
          fullWidth
          @click=${this.onSubmitEmail.bind(this)}
          .disabled=${!showSubmit}
          .loading=${this.loading}
        >
          Save
        </wui-button>
      `;
    }
    return T`
      <wui-flex gap="3">
        <wui-button size="md" variant="neutral" fullWidth @click=${RouterController.goBack}>
          Cancel
        </wui-button>

        <wui-button
          size="md"
          variant="accent-primary"
          fullWidth
          @click=${this.onSubmitEmail.bind(this)}
          .disabled=${!showSubmit}
          .loading=${this.loading}
        >
          Save
        </wui-button>
      </wui-flex>
    `;
  }
};
W3mUpdateEmailWalletView.styles = styles$C;
__decorate$J([
  r()
], W3mUpdateEmailWalletView.prototype, "email", void 0);
__decorate$J([
  r()
], W3mUpdateEmailWalletView.prototype, "loading", void 0);
W3mUpdateEmailWalletView = __decorate$J([
  customElement("w3m-update-email-wallet-view")
], W3mUpdateEmailWalletView);
var __decorate$I = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mUpdateEmailPrimaryOtpView = class W3mUpdateEmailPrimaryOtpView2 extends W3mEmailOtpWidget {
  constructor() {
    super();
    this.email = RouterController.state.data?.email;
    this.onOtpSubmit = async (otp) => {
      try {
        if (this.authConnector) {
          await this.authConnector.provider.updateEmailPrimaryOtp({ otp });
          EventsController.sendEvent({ type: "track", event: "EMAIL_VERIFICATION_CODE_PASS" });
          RouterController.replace("UpdateEmailSecondaryOtp", RouterController.state.data);
        }
      } catch (error) {
        EventsController.sendEvent({
          type: "track",
          event: "EMAIL_VERIFICATION_CODE_FAIL",
          properties: { message: CoreHelperUtil.parseError(error) }
        });
        throw error;
      }
    };
    this.onStartOver = () => {
      RouterController.replace("UpdateEmailWallet", RouterController.state.data);
    };
  }
};
W3mUpdateEmailPrimaryOtpView = __decorate$I([
  customElement("w3m-update-email-primary-otp-view")
], W3mUpdateEmailPrimaryOtpView);
var __decorate$H = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mUpdateEmailSecondaryOtpView = class W3mUpdateEmailSecondaryOtpView2 extends W3mEmailOtpWidget {
  constructor() {
    super();
    this.email = RouterController.state.data?.newEmail;
    this.redirectView = RouterController.state.data?.redirectView;
    this.onOtpSubmit = async (otp) => {
      try {
        if (this.authConnector) {
          await this.authConnector.provider.updateEmailSecondaryOtp({ otp });
          EventsController.sendEvent({ type: "track", event: "EMAIL_VERIFICATION_CODE_PASS" });
          if (this.redirectView) {
            RouterController.reset(this.redirectView);
          }
        }
      } catch (error) {
        EventsController.sendEvent({
          type: "track",
          event: "EMAIL_VERIFICATION_CODE_FAIL",
          properties: { message: CoreHelperUtil.parseError(error) }
        });
        throw error;
      }
    };
    this.onStartOver = () => {
      RouterController.replace("UpdateEmailWallet", RouterController.state.data);
    };
  }
};
W3mUpdateEmailSecondaryOtpView = __decorate$H([
  customElement("w3m-update-email-secondary-otp-view")
], W3mUpdateEmailSecondaryOtpView);
var __decorate$G = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mEmailLoginView = class W3mEmailLoginView2 extends i {
  constructor() {
    super();
    this.authConnector = ConnectorController.getAuthConnector();
    this.isEmailEnabled = OptionsController.state.remoteFeatures?.email;
    this.isAuthEnabled = this.checkIfAuthEnabled(ConnectorController.state.connectors);
    this.connectors = ConnectorController.state.connectors;
    ConnectorController.subscribeKey("connectors", (val) => {
      this.connectors = val;
      this.isAuthEnabled = this.checkIfAuthEnabled(this.connectors);
    });
  }
  render() {
    if (!this.isEmailEnabled) {
      throw new Error("w3m-email-login-view: Email is not enabled");
    }
    if (!this.isAuthEnabled) {
      throw new Error("w3m-email-login-view: No auth connector provided");
    }
    return T`<wui-flex flexDirection="column" .padding=${["1", "3", "3", "3"]} gap="4">
      <w3m-email-login-widget></w3m-email-login-widget>
    </wui-flex> `;
  }
  checkIfAuthEnabled(connectors) {
    const namespacesWithAuthConnector = connectors.filter((c) => c.type === ConstantsUtil$3.CONNECTOR_TYPE_AUTH).map((i2) => i2.chain);
    const authSupportedNamespaces = ConstantsUtil$1.AUTH_CONNECTOR_SUPPORTED_CHAINS;
    return authSupportedNamespaces.some((ns) => namespacesWithAuthConnector.includes(ns));
  }
};
__decorate$G([
  r()
], W3mEmailLoginView.prototype, "connectors", void 0);
W3mEmailLoginView = __decorate$G([
  customElement("w3m-email-login-view")
], W3mEmailLoginView);
const email = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get W3mEmailLoginView() {
    return W3mEmailLoginView;
  },
  get W3mEmailOtpWidget() {
    return W3mEmailOtpWidget;
  },
  get W3mEmailVerifyDeviceView() {
    return W3mEmailVerifyDeviceView;
  },
  get W3mEmailVerifyOtpView() {
    return W3mEmailVerifyOtpView;
  },
  get W3mUpdateEmailPrimaryOtpView() {
    return W3mUpdateEmailPrimaryOtpView;
  },
  get W3mUpdateEmailSecondaryOtpView() {
    return W3mUpdateEmailSecondaryOtpView;
  },
  get W3mUpdateEmailWalletView() {
    return W3mUpdateEmailWalletView;
  }
});
const styles$B = css`
  :host {
    margin-top: ${({ spacing }) => spacing["1"]};
  }
  wui-separator {
    margin: ${({ spacing }) => spacing["3"]} calc(${({ spacing }) => spacing["3"]} * -1)
      ${({ spacing }) => spacing["2"]} calc(${({ spacing }) => spacing["3"]} * -1);
    width: calc(100% + ${({ spacing }) => spacing["3"]} * 2);
  }
`;
var __decorate$F = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mSocialLoginList = class W3mSocialLoginList2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.tabIdx = void 0;
    this.connectors = ConnectorController.state.connectors;
    this.authConnector = this.connectors.find((c) => c.type === "AUTH");
    this.remoteFeatures = OptionsController.state.remoteFeatures;
    this.isPwaLoading = false;
    this.hasExceededUsageLimit = ApiController.state.plan.hasExceededUsageLimit;
    this.unsubscribe.push(ConnectorController.subscribeKey("connectors", (val) => {
      this.connectors = val;
      this.authConnector = this.connectors.find((c) => c.type === "AUTH");
    }), OptionsController.subscribeKey("remoteFeatures", (val) => this.remoteFeatures = val));
  }
  connectedCallback() {
    super.connectedCallback();
    this.handlePwaFrameLoad();
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    let socials2 = this.remoteFeatures?.socials || [];
    const isAuthConnectorExist = Boolean(this.authConnector);
    const isSocialsEnabled = socials2?.length;
    const isConnectSocialsView = RouterController.state.view === "ConnectSocials";
    if ((!isAuthConnectorExist || !isSocialsEnabled) && !isConnectSocialsView) {
      return null;
    }
    if (isConnectSocialsView && !isSocialsEnabled) {
      socials2 = ConstantsUtil$2.DEFAULT_SOCIALS;
    }
    return T` <wui-flex flexDirection="column" gap="2">
      ${socials2.map((social) => T`<wui-list-social
            @click=${() => {
      this.onSocialClick(social);
    }}
            data-testid=${`social-selector-${social}`}
            name=${social}
            logo=${social}
            ?disabled=${this.isPwaLoading}
          ></wui-list-social>`)}
    </wui-flex>`;
  }
  async onSocialClick(socialProvider) {
    if (this.hasExceededUsageLimit) {
      RouterController.push("UsageExceeded");
      return;
    }
    if (socialProvider) {
      await executeSocialLogin(socialProvider);
    }
  }
  async handlePwaFrameLoad() {
    if (CoreHelperUtil.isPWA()) {
      this.isPwaLoading = true;
      try {
        if (this.authConnector?.provider instanceof W3mFrameProvider) {
          await this.authConnector.provider.init();
        }
      } catch (error) {
        AlertController.open({
          displayMessage: "Error loading embedded wallet in PWA",
          debugMessage: error.message
        }, "error");
      } finally {
        this.isPwaLoading = false;
      }
    }
  }
};
W3mSocialLoginList.styles = styles$B;
__decorate$F([
  n()
], W3mSocialLoginList.prototype, "tabIdx", void 0);
__decorate$F([
  r()
], W3mSocialLoginList.prototype, "connectors", void 0);
__decorate$F([
  r()
], W3mSocialLoginList.prototype, "authConnector", void 0);
__decorate$F([
  r()
], W3mSocialLoginList.prototype, "remoteFeatures", void 0);
__decorate$F([
  r()
], W3mSocialLoginList.prototype, "isPwaLoading", void 0);
__decorate$F([
  r()
], W3mSocialLoginList.prototype, "hasExceededUsageLimit", void 0);
W3mSocialLoginList = __decorate$F([
  customElement("w3m-social-login-list")
], W3mSocialLoginList);
const styles$A = css`
  wui-flex {
    max-height: clamp(360px, 540px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
    transition: opacity ${({ durations }) => durations["md"]}
      ${({ easings }) => easings["ease-out-power-1"]};
    will-change: opacity;
  }

  wui-flex::-webkit-scrollbar {
    display: none;
  }

  wui-flex.disabled {
    opacity: 0.3;
    pointer-events: none;
    user-select: none;
  }
`;
var __decorate$E = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mConnectSocialsView = class W3mConnectSocialsView2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.checked = OptionsStateController.state.isLegalCheckboxChecked;
    this.unsubscribe.push(OptionsStateController.subscribeKey("isLegalCheckboxChecked", (val) => {
      this.checked = val;
    }));
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    const { termsConditionsUrl, privacyPolicyUrl } = OptionsController.state;
    const legalCheckbox = OptionsController.state.features?.legalCheckbox;
    const legalUrl = termsConditionsUrl || privacyPolicyUrl;
    const showLegalCheckbox = Boolean(legalUrl) && Boolean(legalCheckbox);
    const disabled = showLegalCheckbox && !this.checked;
    const tabIndex = disabled ? -1 : void 0;
    return T`
      <w3m-legal-checkbox></w3m-legal-checkbox>
      <wui-flex
        flexDirection="column"
        .padding=${["0", "3", "3", "3"]}
        gap="01"
        class=${o(disabled ? "disabled" : void 0)}
      >
        <w3m-social-login-list tabIdx=${o(tabIndex)}></w3m-social-login-list>
      </wui-flex>
    `;
  }
};
W3mConnectSocialsView.styles = styles$A;
__decorate$E([
  r()
], W3mConnectSocialsView.prototype, "checked", void 0);
W3mConnectSocialsView = __decorate$E([
  customElement("w3m-connect-socials-view")
], W3mConnectSocialsView);
const styles$z = css`
  wui-logo {
    width: 80px;
    height: 80px;
    border-radius: ${({ borderRadius }) => borderRadius["8"]};
  }
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }
  wui-flex:first-child:not(:only-child) {
    position: relative;
  }
  wui-loading-thumbnail {
    position: absolute;
  }
  wui-icon-box {
    position: absolute;
    right: calc(${({ spacing }) => spacing["1"]} * -1);
    bottom: calc(${({ spacing }) => spacing["1"]} * -1);
    opacity: 0;
    transform: scale(0.5);
    transition: all ${({ easings }) => easings["ease-out-power-2"]}
      ${({ durations }) => durations["lg"]};
  }
  wui-text[align='center'] {
    width: 100%;
    padding: 0px ${({ spacing }) => spacing["4"]};
  }
  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }
  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms ${({ easings }) => easings["ease-out-power-2"]} both;
  }
  .capitalize {
    text-transform: capitalize;
  }
`;
var __decorate$D = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mConnectingSocialView = class W3mConnectingSocialView2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.socialProvider = ChainController.getAccountData()?.socialProvider;
    this.socialWindow = ChainController.getAccountData()?.socialWindow;
    this.error = false;
    this.connecting = false;
    this.message = "Connect in the provider window";
    this.remoteFeatures = OptionsController.state.remoteFeatures;
    this.address = ChainController.getAccountData()?.address;
    this.connectionsByNamespace = ConnectionController.getConnections(ChainController.state.activeChain);
    this.hasMultipleConnections = this.connectionsByNamespace.length > 0;
    this.authConnector = ConnectorController.getAuthConnector();
    this.handleSocialConnection = async (event) => {
      if (event.data?.resultUri) {
        if (event.origin === ConstantsUtil.SECURE_SITE_ORIGIN) {
          window.removeEventListener("message", this.handleSocialConnection, false);
          try {
            if (this.authConnector && !this.connecting) {
              this.connecting = true;
              const error = this.parseURLError(event.data.resultUri);
              if (error) {
                this.handleSocialError(error);
                return;
              }
              this.closeSocialWindow();
              this.updateMessage();
              const uri = event.data.resultUri;
              if (this.socialProvider) {
                EventsController.sendEvent({
                  type: "track",
                  event: "SOCIAL_LOGIN_REQUEST_USER_DATA",
                  properties: { provider: this.socialProvider }
                });
              }
              await ConnectionController.connectExternal({
                id: this.authConnector.id,
                type: this.authConnector.type,
                socialUri: uri
              }, this.authConnector.chain);
              if (this.socialProvider) {
                StorageUtil.setConnectedSocialProvider(this.socialProvider);
                EventsController.sendEvent({
                  type: "track",
                  event: "SOCIAL_LOGIN_SUCCESS",
                  properties: { provider: this.socialProvider }
                });
              }
            }
          } catch (error) {
            this.error = true;
            this.updateMessage();
            if (this.socialProvider) {
              EventsController.sendEvent({
                type: "track",
                event: "SOCIAL_LOGIN_ERROR",
                properties: {
                  provider: this.socialProvider,
                  message: CoreHelperUtil.parseError(error)
                }
              });
            }
          }
        } else {
          RouterController.goBack();
          SnackController.showError("Untrusted Origin");
          if (this.socialProvider) {
            EventsController.sendEvent({
              type: "track",
              event: "SOCIAL_LOGIN_ERROR",
              properties: {
                provider: this.socialProvider,
                message: "Untrusted Origin"
              }
            });
          }
        }
      }
    };
    const abortController = ErrorUtil.EmbeddedWalletAbortController;
    abortController.signal.addEventListener("abort", () => {
      this.closeSocialWindow();
    });
    this.unsubscribe.push(...[
      ChainController.subscribeChainProp("accountState", (val) => {
        if (val) {
          this.socialProvider = val.socialProvider;
          if (val.socialWindow) {
            this.socialWindow = val.socialWindow;
          }
          if (val.address) {
            const isMultiWalletEnabled = this.remoteFeatures?.multiWallet;
            if (val.address !== this.address) {
              if (this.hasMultipleConnections && isMultiWalletEnabled) {
                RouterController.replace("ProfileWallets");
                SnackController.showSuccess("New Wallet Added");
                this.address = val.address;
              } else if (ModalController.state.open || OptionsController.state.enableEmbedded) {
                ModalController.close();
              }
            }
          }
        }
      }),
      OptionsController.subscribeKey("remoteFeatures", (val) => {
        this.remoteFeatures = val;
      })
    ]);
    if (this.authConnector) {
      this.connectSocial();
    }
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
    window.removeEventListener("message", this.handleSocialConnection, false);
    const isConnected = ChainController.state.activeCaipAddress;
    if (!isConnected && this.socialProvider && !this.connecting) {
      EventsController.sendEvent({
        type: "track",
        event: "SOCIAL_LOGIN_CANCELED",
        properties: { provider: this.socialProvider }
      });
    }
    this.closeSocialWindow();
  }
  render() {
    return T`
      <wui-flex
        data-error=${o(this.error)}
        flexDirection="column"
        alignItems="center"
        .padding=${["10", "5", "5", "5"]}
        gap="6"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-logo logo=${o(this.socialProvider)}></wui-logo>
          ${this.error ? null : this.loaderTemplate()}
          <wui-icon-box color="error" icon="close" size="sm"></wui-icon-box>
        </wui-flex>
        <wui-flex flexDirection="column" alignItems="center" gap="2">
          <wui-text align="center" variant="lg-medium" color="primary"
            >Log in with
            <span class="capitalize">${this.socialProvider ?? "Social"}</span></wui-text
          >
          <wui-text align="center" variant="lg-regular" color=${this.error ? "error" : "secondary"}
            >${this.message}</wui-text
          ></wui-flex
        >
      </wui-flex>
    `;
  }
  loaderTemplate() {
    const borderRadiusMaster = ThemeController.state.themeVariables["--w3m-border-radius-master"];
    const radius = borderRadiusMaster ? parseInt(borderRadiusMaster.replace("px", ""), 10) : 4;
    return T`<wui-loading-thumbnail radius=${radius * 9}></wui-loading-thumbnail>`;
  }
  parseURLError(uri) {
    try {
      const errorKey = "error=";
      const errorIndex = uri.indexOf(errorKey);
      if (errorIndex === -1) {
        return null;
      }
      const error = uri.substring(errorIndex + errorKey.length);
      return error;
    } catch {
      return null;
    }
  }
  connectSocial() {
    const interval = setInterval(() => {
      if (this.socialWindow?.closed) {
        if (!this.connecting && RouterController.state.view === "ConnectingSocial") {
          RouterController.goBack();
        }
        clearInterval(interval);
      }
    }, 1e3);
    window.addEventListener("message", this.handleSocialConnection, false);
  }
  updateMessage() {
    if (this.error) {
      this.message = "Something went wrong";
    } else if (this.connecting) {
      this.message = "Retrieving user data";
    } else {
      this.message = "Connect in the provider window";
    }
  }
  handleSocialError(error) {
    this.error = true;
    this.updateMessage();
    if (this.socialProvider) {
      EventsController.sendEvent({
        type: "track",
        event: "SOCIAL_LOGIN_ERROR",
        properties: { provider: this.socialProvider, message: error }
      });
    }
    this.closeSocialWindow();
  }
  closeSocialWindow() {
    if (this.socialWindow) {
      this.socialWindow.close();
      ChainController.setAccountProp("socialWindow", void 0, ChainController.state.activeChain);
    }
  }
};
W3mConnectingSocialView.styles = styles$z;
__decorate$D([
  r()
], W3mConnectingSocialView.prototype, "socialProvider", void 0);
__decorate$D([
  r()
], W3mConnectingSocialView.prototype, "socialWindow", void 0);
__decorate$D([
  r()
], W3mConnectingSocialView.prototype, "error", void 0);
__decorate$D([
  r()
], W3mConnectingSocialView.prototype, "connecting", void 0);
__decorate$D([
  r()
], W3mConnectingSocialView.prototype, "message", void 0);
__decorate$D([
  r()
], W3mConnectingSocialView.prototype, "remoteFeatures", void 0);
W3mConnectingSocialView = __decorate$D([
  customElement("w3m-connecting-social-view")
], W3mConnectingSocialView);
const styles$y = css`
  wui-shimmer {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: ${({ borderRadius }) => borderRadius[4]};
  }

  wui-qr-code {
    opacity: 0;
    animation-duration: ${({ durations }) => durations["xl"]};
    animation-timing-function: ${({ easings }) => easings["ease-out-power-2"]};
    animation-name: fade-in;
    animation-fill-mode: forwards;
  }

  wui-logo {
    width: 80px;
    height: 80px;
    border-radius: ${({ borderRadius }) => borderRadius["8"]};
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-loading-thumbnail {
    position: absolute;
  }

  wui-icon-box {
    position: absolute;
    right: calc(${({ spacing }) => spacing["1"]} * -1);
    bottom: calc(${({ spacing }) => spacing["1"]} * -1);
    opacity: 0;
    transform: scale(0.5);
    transition:
      opacity ${({ durations }) => durations["lg"]} ${({ easings }) => easings["ease-out-power-2"]},
      transform ${({ durations }) => durations["lg"]}
        ${({ easings }) => easings["ease-out-power-2"]};
    will-change: opacity, transform;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
var __decorate$C = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mConnectingFarcasterView = class W3mConnectingFarcasterView2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.timeout = void 0;
    this.socialProvider = ChainController.getAccountData()?.socialProvider;
    this.uri = ChainController.getAccountData()?.farcasterUrl;
    this.ready = false;
    this.loading = false;
    this.remoteFeatures = OptionsController.state.remoteFeatures;
    this.authConnector = ConnectorController.getAuthConnector();
    this.forceUpdate = () => {
      this.requestUpdate();
    };
    this.unsubscribe.push(...[
      ChainController.subscribeChainProp("accountState", (val) => {
        this.socialProvider = val?.socialProvider;
        this.uri = val?.farcasterUrl;
        this.connectFarcaster();
      }),
      OptionsController.subscribeKey("remoteFeatures", (val) => {
        this.remoteFeatures = val;
      })
    ]);
    window.addEventListener("resize", this.forceUpdate);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    clearTimeout(this.timeout);
    window.removeEventListener("resize", this.forceUpdate);
    const isConnected = ChainController.state.activeCaipAddress;
    if (!isConnected && this.socialProvider && (this.uri || this.loading)) {
      EventsController.sendEvent({
        type: "track",
        event: "SOCIAL_LOGIN_CANCELED",
        properties: { provider: this.socialProvider }
      });
    }
  }
  render() {
    this.onRenderProxy();
    return T`${this.platformTemplate()}`;
  }
  platformTemplate() {
    if (CoreHelperUtil.isMobile()) {
      return T`${this.mobileTemplate()}`;
    }
    return T`${this.desktopTemplate()}`;
  }
  desktopTemplate() {
    if (this.loading) {
      return T`${this.loadingTemplate()}`;
    }
    return T`${this.qrTemplate()}`;
  }
  qrTemplate() {
    return T` <wui-flex
      flexDirection="column"
      alignItems="center"
      .padding=${["0", "5", "5", "5"]}
      gap="5"
    >
      <wui-shimmer width="100%"> ${this.qrCodeTemplate()} </wui-shimmer>

      <wui-text variant="lg-medium" color="primary"> Scan this QR Code with your phone </wui-text>
      ${this.copyTemplate()}
    </wui-flex>`;
  }
  loadingTemplate() {
    return T`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["5", "5", "5", "5"]}
        gap="5"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-logo logo="farcaster"></wui-logo>
          ${this.loaderTemplate()}
          <wui-icon-box color="error" icon="close" size="sm"></wui-icon-box>
        </wui-flex>
        <wui-flex flexDirection="column" alignItems="center" gap="2">
          <wui-text align="center" variant="md-medium" color="primary">
            Loading user data
          </wui-text>
          <wui-text align="center" variant="sm-regular" color="secondary">
            Please wait a moment while we load your data.
          </wui-text>
        </wui-flex>
      </wui-flex>
    `;
  }
  mobileTemplate() {
    return T` <wui-flex
      flexDirection="column"
      alignItems="center"
      .padding=${["10", "5", "5", "5"]}
      gap="5"
    >
      <wui-flex justifyContent="center" alignItems="center">
        <wui-logo logo="farcaster"></wui-logo>
        ${this.loaderTemplate()}
        <wui-icon-box
          color="error"
          icon="close"
          size="sm"
        ></wui-icon-box>
      </wui-flex>
      <wui-flex flexDirection="column" alignItems="center" gap="2">
        <wui-text align="center" variant="md-medium" color="primary"
          >Continue in Farcaster</span></wui-text
        >
        <wui-text align="center" variant="sm-regular" color="secondary"
          >Accept connection request in the app</wui-text
        ></wui-flex
      >
      ${this.mobileLinkTemplate()}
    </wui-flex>`;
  }
  loaderTemplate() {
    const borderRadiusMaster = ThemeController.state.themeVariables["--w3m-border-radius-master"];
    const radius = borderRadiusMaster ? parseInt(borderRadiusMaster.replace("px", ""), 10) : 4;
    return T`<wui-loading-thumbnail radius=${radius * 9}></wui-loading-thumbnail>`;
  }
  async connectFarcaster() {
    if (this.authConnector) {
      try {
        await this.authConnector?.provider.connectFarcaster();
        if (this.socialProvider) {
          StorageUtil.setConnectedSocialProvider(this.socialProvider);
          EventsController.sendEvent({
            type: "track",
            event: "SOCIAL_LOGIN_REQUEST_USER_DATA",
            properties: { provider: this.socialProvider }
          });
        }
        this.loading = true;
        const connectionsByNamespace = ConnectionController.getConnections(this.authConnector.chain);
        const hasConnections = connectionsByNamespace.length > 0;
        await ConnectionController.connectExternal(this.authConnector, this.authConnector.chain);
        const isMultiWalletEnabled = this.remoteFeatures?.multiWallet;
        if (this.socialProvider) {
          EventsController.sendEvent({
            type: "track",
            event: "SOCIAL_LOGIN_SUCCESS",
            properties: { provider: this.socialProvider }
          });
        }
        this.loading = false;
        if (hasConnections && isMultiWalletEnabled) {
          RouterController.replace("ProfileWallets");
          SnackController.showSuccess("New Wallet Added");
        } else {
          ModalController.close();
        }
      } catch (error) {
        if (this.socialProvider) {
          EventsController.sendEvent({
            type: "track",
            event: "SOCIAL_LOGIN_ERROR",
            properties: { provider: this.socialProvider, message: CoreHelperUtil.parseError(error) }
          });
        }
        RouterController.goBack();
        SnackController.showError(error);
      }
    }
  }
  mobileLinkTemplate() {
    return T`<wui-button
      size="md"
      ?loading=${this.loading}
      ?disabled=${!this.uri || this.loading}
      @click=${() => {
      if (this.uri) {
        CoreHelperUtil.openHref(this.uri, "_blank");
      }
    }}
    >
      Open farcaster</wui-button
    >`;
  }
  onRenderProxy() {
    if (!this.ready && this.uri) {
      this.timeout = setTimeout(() => {
        this.ready = true;
      }, 200);
    }
  }
  qrCodeTemplate() {
    if (!this.uri || !this.ready) {
      return null;
    }
    const size = this.getBoundingClientRect().width - 40;
    const qrColor = ThemeController.state.themeVariables["--apkt-qr-color"] ?? ThemeController.state.themeVariables["--w3m-qr-color"];
    return T` <wui-qr-code
      size=${size}
      theme=${ThemeController.state.themeMode}
      uri=${this.uri}
      ?farcaster=${true}
      data-testid="wui-qr-code"
      color=${o(qrColor)}
    ></wui-qr-code>`;
  }
  copyTemplate() {
    const inactive = !this.uri || !this.ready;
    return T`<wui-button
      .disabled=${inactive}
      @click=${this.onCopyUri}
      variant="neutral-secondary"
      size="sm"
      data-testid="copy-wc2-uri"
    >
      <wui-icon size="sm" color="default" slot="iconRight" name="copy"></wui-icon>
      Copy link
    </wui-button>`;
  }
  onCopyUri() {
    try {
      if (this.uri) {
        CoreHelperUtil.copyToClopboard(this.uri);
        SnackController.showSuccess("Link copied");
      }
    } catch {
      SnackController.showError("Failed to copy");
    }
  }
};
W3mConnectingFarcasterView.styles = styles$y;
__decorate$C([
  r()
], W3mConnectingFarcasterView.prototype, "socialProvider", void 0);
__decorate$C([
  r()
], W3mConnectingFarcasterView.prototype, "uri", void 0);
__decorate$C([
  r()
], W3mConnectingFarcasterView.prototype, "ready", void 0);
__decorate$C([
  r()
], W3mConnectingFarcasterView.prototype, "loading", void 0);
__decorate$C([
  r()
], W3mConnectingFarcasterView.prototype, "remoteFeatures", void 0);
W3mConnectingFarcasterView = __decorate$C([
  customElement("w3m-connecting-farcaster-view")
], W3mConnectingFarcasterView);
const socials = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get W3mConnectSocialsView() {
    return W3mConnectSocialsView;
  },
  get W3mConnectingFarcasterView() {
    return W3mConnectingFarcasterView;
  },
  get W3mConnectingSocialView() {
    return W3mConnectingSocialView;
  }
});
const styles$x = css`
  :host {
    width: 100%;
  }

  .details-container > wui-flex {
    background: ${({ tokens }) => tokens.theme.foregroundPrimary};
    border-radius: ${({ borderRadius }) => borderRadius["3"]};
    width: 100%;
  }

  .details-container > wui-flex > button {
    border: none;
    background: none;
    padding: ${({ spacing }) => spacing["3"]};
    border-radius: ${({ borderRadius }) => borderRadius["3"]};
    cursor: pointer;
  }

  .details-content-container {
    padding: ${({ spacing }) => spacing["2"]};
    padding-top: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .details-content-container > wui-flex {
    width: 100%;
  }

  .details-row {
    width: 100%;
    padding: ${({ spacing }) => spacing["3"]};
    padding-left: ${({ spacing }) => spacing["3"]};
    padding-right: ${({ spacing }) => spacing["2"]};
    border-radius: calc(
      ${({ borderRadius }) => borderRadius["1"]} + ${({ borderRadius }) => borderRadius["1"]}
    );
    background: ${({ tokens }) => tokens.theme.foregroundPrimary};
  }

  .details-row-title {
    white-space: nowrap;
  }

  .details-row.provider-free-row {
    padding-right: ${({ spacing }) => spacing["2"]};
  }
`;
var __decorate$B = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
const slippageRate = ConstantsUtil$2.CONVERT_SLIPPAGE_TOLERANCE;
let WuiSwapDetails = class WuiSwapDetails2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.networkName = ChainController.state.activeCaipNetwork?.name;
    this.detailsOpen = false;
    this.sourceToken = SwapController.state.sourceToken;
    this.toToken = SwapController.state.toToken;
    this.toTokenAmount = SwapController.state.toTokenAmount;
    this.sourceTokenPriceInUSD = SwapController.state.sourceTokenPriceInUSD;
    this.toTokenPriceInUSD = SwapController.state.toTokenPriceInUSD;
    this.priceImpact = SwapController.state.priceImpact;
    this.maxSlippage = SwapController.state.maxSlippage;
    this.networkTokenSymbol = SwapController.state.networkTokenSymbol;
    this.inputError = SwapController.state.inputError;
    this.unsubscribe.push(...[
      SwapController.subscribe((newState) => {
        this.sourceToken = newState.sourceToken;
        this.toToken = newState.toToken;
        this.toTokenAmount = newState.toTokenAmount;
        this.priceImpact = newState.priceImpact;
        this.maxSlippage = newState.maxSlippage;
        this.sourceTokenPriceInUSD = newState.sourceTokenPriceInUSD;
        this.toTokenPriceInUSD = newState.toTokenPriceInUSD;
        this.inputError = newState.inputError;
      })
    ]);
  }
  render() {
    const minReceivedAmount = this.toTokenAmount && this.maxSlippage ? NumberUtil.bigNumber(this.toTokenAmount).minus(this.maxSlippage).toString() : null;
    if (!this.sourceToken || !this.toToken || this.inputError) {
      return null;
    }
    const toTokenSwappedAmount = this.sourceTokenPriceInUSD && this.toTokenPriceInUSD ? 1 / this.toTokenPriceInUSD * this.sourceTokenPriceInUSD : 0;
    return T`
      <wui-flex flexDirection="column" alignItems="center" gap="01" class="details-container">
        <wui-flex flexDirection="column">
          <button @click=${this.toggleDetails.bind(this)}>
            <wui-flex justifyContent="space-between" .padding=${["0", "2", "0", "2"]}>
              <wui-flex justifyContent="flex-start" flexGrow="1" gap="2">
                <wui-text variant="sm-regular" color="primary">
                  1 ${this.sourceToken.symbol} =
                  ${NumberUtil.formatNumberToLocalString(toTokenSwappedAmount, 3)}
                  ${this.toToken.symbol}
                </wui-text>
                <wui-text variant="sm-regular" color="secondary">
                  $${NumberUtil.formatNumberToLocalString(this.sourceTokenPriceInUSD)}
                </wui-text>
              </wui-flex>
              <wui-icon name="chevronBottom"></wui-icon>
            </wui-flex>
          </button>
          ${this.detailsOpen ? T`
                <wui-flex flexDirection="column" gap="2" class="details-content-container">
                  ${this.priceImpact ? T` <wui-flex flexDirection="column" gap="2">
                        <wui-flex
                          justifyContent="space-between"
                          alignItems="center"
                          class="details-row"
                        >
                          <wui-flex alignItems="center" gap="2">
                            <wui-text
                              class="details-row-title"
                              variant="sm-regular"
                              color="secondary"
                            >
                              Price impact
                            </wui-text>
                            <w3m-tooltip-trigger
                              text="Price impact reflects the change in market price due to your trade"
                            >
                              <wui-icon size="sm" color="default" name="info"></wui-icon>
                            </w3m-tooltip-trigger>
                          </wui-flex>
                          <wui-flex>
                            <wui-text variant="sm-regular" color="secondary">
                              ${NumberUtil.formatNumberToLocalString(this.priceImpact, 3)}%
                            </wui-text>
                          </wui-flex>
                        </wui-flex>
                      </wui-flex>` : null}
                  ${this.maxSlippage && this.sourceToken.symbol ? T`<wui-flex flexDirection="column" gap="2">
                        <wui-flex
                          justifyContent="space-between"
                          alignItems="center"
                          class="details-row"
                        >
                          <wui-flex alignItems="center" gap="2">
                            <wui-text
                              class="details-row-title"
                              variant="sm-regular"
                              color="secondary"
                            >
                              Max. slippage
                            </wui-text>
                            <w3m-tooltip-trigger
                              text=${`Max slippage sets the minimum amount you must receive for the transaction to proceed. ${minReceivedAmount ? `Transaction will be reversed if you receive less than ${NumberUtil.formatNumberToLocalString(minReceivedAmount, 6)} ${this.toToken.symbol} due to price changes.` : ""}`}
                            >
                              <wui-icon size="sm" color="default" name="info"></wui-icon>
                            </w3m-tooltip-trigger>
                          </wui-flex>
                          <wui-flex>
                            <wui-text variant="sm-regular" color="secondary">
                              ${NumberUtil.formatNumberToLocalString(this.maxSlippage, 6)}
                              ${this.toToken.symbol} ${slippageRate}%
                            </wui-text>
                          </wui-flex>
                        </wui-flex>
                      </wui-flex>` : null}
                  <wui-flex flexDirection="column" gap="2">
                    <wui-flex
                      justifyContent="space-between"
                      alignItems="center"
                      class="details-row provider-free-row"
                    >
                      <wui-flex alignItems="center" gap="2">
                        <wui-text class="details-row-title" variant="sm-regular" color="secondary">
                          Provider fee
                        </wui-text>
                      </wui-flex>
                      <wui-flex>
                        <wui-text variant="sm-regular" color="secondary">0.85%</wui-text>
                      </wui-flex>
                    </wui-flex>
                  </wui-flex>
                </wui-flex>
              ` : null}
        </wui-flex>
      </wui-flex>
    `;
  }
  toggleDetails() {
    this.detailsOpen = !this.detailsOpen;
  }
};
WuiSwapDetails.styles = [styles$x];
__decorate$B([
  r()
], WuiSwapDetails.prototype, "networkName", void 0);
__decorate$B([
  n()
], WuiSwapDetails.prototype, "detailsOpen", void 0);
__decorate$B([
  r()
], WuiSwapDetails.prototype, "sourceToken", void 0);
__decorate$B([
  r()
], WuiSwapDetails.prototype, "toToken", void 0);
__decorate$B([
  r()
], WuiSwapDetails.prototype, "toTokenAmount", void 0);
__decorate$B([
  r()
], WuiSwapDetails.prototype, "sourceTokenPriceInUSD", void 0);
__decorate$B([
  r()
], WuiSwapDetails.prototype, "toTokenPriceInUSD", void 0);
__decorate$B([
  r()
], WuiSwapDetails.prototype, "priceImpact", void 0);
__decorate$B([
  r()
], WuiSwapDetails.prototype, "maxSlippage", void 0);
__decorate$B([
  r()
], WuiSwapDetails.prototype, "networkTokenSymbol", void 0);
__decorate$B([
  r()
], WuiSwapDetails.prototype, "inputError", void 0);
WuiSwapDetails = __decorate$B([
  customElement("w3m-swap-details")
], WuiSwapDetails);
const styles$w = css`
  :host {
    width: 100%;
  }

  :host > wui-flex {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: ${({ borderRadius }) => borderRadius["5"]};
    padding: ${({ spacing }) => spacing["5"]};
    padding-right: ${({ spacing }) => spacing["3"]};
    background-color: ${({ tokens }) => tokens.theme.foregroundPrimary};
    box-shadow: inset 0px 0px 0px 1px ${({ tokens }) => tokens.theme.foregroundPrimary};
    width: 100%;
    height: 100px;
    box-sizing: border-box;
    position: relative;
  }

  wui-shimmer.market-value {
    opacity: 0;
  }

  :host > wui-flex > svg.input_mask {
    position: absolute;
    inset: 0;
    z-index: 5;
  }

  :host wui-flex .input_mask__border,
  :host wui-flex .input_mask__background {
    transition: fill ${({ durations }) => durations["md"]}
      ${({ easings }) => easings["ease-out-power-1"]};
    will-change: fill;
  }

  :host wui-flex .input_mask__border {
    fill: ${({ tokens }) => tokens.core.glass010};
  }

  :host wui-flex .input_mask__background {
    fill: ${({ tokens }) => tokens.theme.foregroundPrimary};
  }
`;
var __decorate$A = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mSwapInputSkeleton = class W3mSwapInputSkeleton2 extends i {
  constructor() {
    super(...arguments);
    this.target = "sourceToken";
  }
  render() {
    return T`
      <wui-flex class justifyContent="space-between">
        <wui-flex
          flex="1"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="center"
          class="swap-input"
          gap="1"
        >
          <wui-shimmer width="80px" height="40px" rounded variant="light"></wui-shimmer>
        </wui-flex>
        ${this.templateTokenSelectButton()}
      </wui-flex>
    `;
  }
  templateTokenSelectButton() {
    return T`
      <wui-flex
        class="swap-token-button"
        flexDirection="column"
        alignItems="flex-end"
        justifyContent="center"
        gap="1"
      >
        <wui-shimmer width="80px" height="40px" rounded variant="light"></wui-shimmer>
      </wui-flex>
    `;
  }
};
W3mSwapInputSkeleton.styles = [styles$w];
__decorate$A([
  n()
], W3mSwapInputSkeleton.prototype, "target", void 0);
W3mSwapInputSkeleton = __decorate$A([
  customElement("w3m-swap-input-skeleton")
], W3mSwapInputSkeleton);
const styles$v = css`
  :host > wui-flex {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: ${({ borderRadius }) => borderRadius["5"]};
    background-color: ${({ tokens }) => tokens.theme.foregroundPrimary};
    padding: ${({ spacing }) => spacing["5"]};
    padding-right: ${({ spacing }) => spacing["3"]};
    width: 100%;
    height: 100px;
    box-sizing: border-box;
    box-shadow: inset 0px 0px 0px 1px ${({ tokens }) => tokens.theme.foregroundPrimary};
    position: relative;
    transition: box-shadow ${({ easings }) => easings["ease-out-power-1"]}
      ${({ durations }) => durations["lg"]};
    will-change: background-color;
  }

  :host wui-flex.focus {
    box-shadow: inset 0px 0px 0px 1px ${({ tokens }) => tokens.core.glass010};
  }

  :host > wui-flex .swap-input,
  :host > wui-flex .swap-token-button {
    z-index: 10;
  }

  :host > wui-flex .swap-input {
    -webkit-mask-image: linear-gradient(
      270deg,
      transparent 0px,
      transparent 8px,
      black 24px,
      black 25px,
      black 32px,
      black 100%
    );
    mask-image: linear-gradient(
      270deg,
      transparent 0px,
      transparent 8px,
      black 24px,
      black 25px,
      black 32px,
      black 100%
    );
  }

  :host > wui-flex .swap-input input {
    background: none;
    border: none;
    height: 42px;
    width: 100%;
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    line-height: 130%;
    letter-spacing: -1.28px;
    outline: none;
    caret-color: ${({ tokens }) => tokens.core.textAccentPrimary};
    color: ${({ tokens }) => tokens.theme.textPrimary};
    padding: 0px;
  }

  :host > wui-flex .swap-input input:focus-visible {
    outline: none;
  }

  :host > wui-flex .swap-input input::-webkit-outer-spin-button,
  :host > wui-flex .swap-input input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .max-value-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: ${({ tokens }) => tokens.core.glass010};
    padding-left: 0px;
  }

  .market-value {
    min-height: 18px;
  }
`;
var __decorate$z = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
const MINIMUM_USD_VALUE_TO_CONVERT = 5e-5;
let W3mSwapInput = class W3mSwapInput2 extends i {
  constructor() {
    super(...arguments);
    this.focused = false;
    this.price = 0;
    this.target = "sourceToken";
    this.onSetAmount = null;
    this.onSetMaxValue = null;
    this.autoFocus = false;
  }
  firstUpdated() {
    if (this.autoFocus) {
      requestAnimationFrame(() => {
        const input = this.shadowRoot?.querySelector("input");
        input?.focus();
      });
    }
  }
  render() {
    const marketValue = this.marketValue || "0";
    const isMarketValueGreaterThanZero = NumberUtil.bigNumber(marketValue).gt("0");
    return T`
      <wui-flex
        class="${this.focused ? "focus" : ""}"
        justifyContent="space-between"
        alignItems="center"
      >
        <wui-flex
          flex="1"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="center"
          class="swap-input"
        >
          <input
            data-testid="swap-input-${this.target}"
            @focusin=${() => this.onFocusChange(true)}
            @focusout=${() => this.onFocusChange(false)}
            ?disabled=${this.disabled}
            value=${this.value || ""}
            @input=${this.dispatchInputChangeEvent}
            @keydown=${this.handleKeydown}
            placeholder="0"
            type="text"
            inputmode="decimal"
            pattern="[0-9,.]*"
          />
          <wui-text class="market-value" variant="sm-regular" color="secondary">
            ${isMarketValueGreaterThanZero ? `$${NumberUtil.formatNumberToLocalString(this.marketValue, 2)}` : null}
          </wui-text>
        </wui-flex>
        ${this.templateTokenSelectButton()}
      </wui-flex>
    `;
  }
  handleKeydown(event) {
    return InputUtil.numericInputKeyDown(event, this.value, (value) => this.onSetAmount?.(this.target, value));
  }
  dispatchInputChangeEvent(event) {
    if (!this.onSetAmount) {
      return;
    }
    const value = event.target.value.replace(/[^0-9.]/gu, "");
    if (value === "," || value === ".") {
      this.onSetAmount(this.target, "0.");
    } else if (value.endsWith(",")) {
      this.onSetAmount(this.target, value.replace(",", "."));
    } else {
      this.onSetAmount(this.target, value);
    }
  }
  setMaxValueToInput() {
    this.onSetMaxValue?.(this.target, this.balance);
  }
  templateTokenSelectButton() {
    if (!this.token) {
      return T` <wui-button
        data-testid="swap-select-token-button-${this.target}"
        class="swap-token-button"
        size="md"
        variant="neutral-secondary"
        @click=${this.onSelectToken.bind(this)}
      >
        Select token
      </wui-button>`;
    }
    return T`
      <wui-flex
        class="swap-token-button"
        flexDirection="column"
        alignItems="flex-end"
        justifyContent="center"
        gap="1"
      >
        <wui-token-button
          data-testid="swap-input-token-${this.target}"
          text=${this.token.symbol}
          imageSrc=${this.token.logoUri}
          @click=${this.onSelectToken.bind(this)}
        >
        </wui-token-button>
        <wui-flex alignItems="center" gap="1"> ${this.tokenBalanceTemplate()} </wui-flex>
      </wui-flex>
    `;
  }
  tokenBalanceTemplate() {
    const balanceValueInUSD = NumberUtil.multiply(this.balance, this.price);
    const haveBalance = balanceValueInUSD ? balanceValueInUSD?.gt(MINIMUM_USD_VALUE_TO_CONVERT) : false;
    return T`
      ${haveBalance ? T`<wui-text variant="sm-regular" color="secondary">
            ${NumberUtil.formatNumberToLocalString(this.balance, 2)}
          </wui-text>` : null}
      ${this.target === "sourceToken" ? this.tokenActionButtonTemplate(haveBalance) : null}
    `;
  }
  tokenActionButtonTemplate(haveBalance) {
    if (haveBalance) {
      return T` <button class="max-value-button" @click=${this.setMaxValueToInput.bind(this)}>
        <wui-text color="accent-primary" variant="sm-medium">Max</wui-text>
      </button>`;
    }
    return T` <button class="max-value-button" @click=${this.onBuyToken.bind(this)}>
      <wui-text color="accent-primary" variant="sm-medium">Buy</wui-text>
    </button>`;
  }
  onFocusChange(state) {
    this.focused = state;
  }
  onSelectToken() {
    EventsController.sendEvent({ type: "track", event: "CLICK_SELECT_TOKEN_TO_SWAP" });
    RouterController.push("SwapSelectToken", {
      target: this.target
    });
  }
  onBuyToken() {
    RouterController.push("OnRampProviders");
  }
};
W3mSwapInput.styles = [styles$v];
__decorate$z([
  n()
], W3mSwapInput.prototype, "focused", void 0);
__decorate$z([
  n()
], W3mSwapInput.prototype, "balance", void 0);
__decorate$z([
  n()
], W3mSwapInput.prototype, "value", void 0);
__decorate$z([
  n()
], W3mSwapInput.prototype, "price", void 0);
__decorate$z([
  n()
], W3mSwapInput.prototype, "marketValue", void 0);
__decorate$z([
  n()
], W3mSwapInput.prototype, "disabled", void 0);
__decorate$z([
  n()
], W3mSwapInput.prototype, "target", void 0);
__decorate$z([
  n()
], W3mSwapInput.prototype, "token", void 0);
__decorate$z([
  n()
], W3mSwapInput.prototype, "onSetAmount", void 0);
__decorate$z([
  n()
], W3mSwapInput.prototype, "onSetMaxValue", void 0);
__decorate$z([
  n({ type: Boolean })
], W3mSwapInput.prototype, "autoFocus", void 0);
W3mSwapInput = __decorate$z([
  customElement("w3m-swap-input")
], W3mSwapInput);
const styles$u = css`
  :host > wui-flex:first-child {
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  :host > wui-flex:first-child::-webkit-scrollbar {
    display: none;
  }

  wui-loading-hexagon {
    position: absolute;
  }

  .action-button {
    width: 100%;
    border-radius: ${({ borderRadius }) => borderRadius["4"]};
  }

  .action-button:disabled {
    border-color: 1px solid ${({ tokens }) => tokens.core.glass010};
  }

  .swap-inputs-container {
    position: relative;
  }

  wui-icon-box {
    width: 32px;
    height: 32px;
    border-radius: ${({ borderRadius }) => borderRadius["10"]} !important;
    border: 4px solid ${({ tokens }) => tokens.theme.backgroundPrimary};
    background: ${({ tokens }) => tokens.theme.foregroundPrimary};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
  }

  .replace-tokens-button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    gap: ${({ spacing }) => spacing["2"]};
    border-radius: ${({ borderRadius }) => borderRadius["4"]};
    background-color: ${({ tokens }) => tokens.theme.backgroundPrimary};
    padding: ${({ spacing }) => spacing["2"]};
  }

  .details-container > wui-flex {
    background: ${({ tokens }) => tokens.theme.foregroundPrimary};
    border-radius: ${({ borderRadius }) => borderRadius["3"]};
    width: 100%;
  }

  .details-container > wui-flex > button {
    border: none;
    background: none;
    padding: ${({ spacing }) => spacing["3"]};
    border-radius: ${({ borderRadius }) => borderRadius["3"]};
    transition: background ${({ durations }) => durations["lg"]}
      ${({ easings }) => easings["ease-out-power-2"]};
    will-change: background;
  }

  .details-container > wui-flex > button:hover {
    background: ${({ tokens }) => tokens.theme.foregroundPrimary};
  }

  .details-content-container {
    padding: ${({ spacing }) => spacing["2"]};
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .details-content-container > wui-flex {
    width: 100%;
  }

  .details-row {
    width: 100%;
    padding: ${({ spacing }) => spacing["3"]} ${({ spacing }) => spacing["5"]};
    border-radius: ${({ borderRadius }) => borderRadius["3"]};
    background: ${({ tokens }) => tokens.theme.foregroundPrimary};
  }
`;
var __decorate$y = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mSwapView = class W3mSwapView2 extends i {
  subscribe({ resetSwapState, initializeSwapState }) {
    return () => {
      ChainController.subscribeKey("activeCaipNetwork", (newCaipNetwork) => this.onCaipNetworkChange({
        newCaipNetwork,
        resetSwapState,
        initializeSwapState
      }));
      ChainController.subscribeChainProp("accountState", (val) => {
        this.onCaipAddressChange({
          newCaipAddress: val?.caipAddress,
          resetSwapState,
          initializeSwapState
        });
      });
    };
  }
  constructor() {
    super();
    this.unsubscribe = [];
    this.initialParams = RouterController.state.data?.swap;
    this.detailsOpen = false;
    this.caipAddress = ChainController.getAccountData()?.caipAddress;
    this.caipNetworkId = ChainController.state.activeCaipNetwork?.caipNetworkId;
    this.initialized = SwapController.state.initialized;
    this.loadingQuote = SwapController.state.loadingQuote;
    this.loadingPrices = SwapController.state.loadingPrices;
    this.loadingTransaction = SwapController.state.loadingTransaction;
    this.sourceToken = SwapController.state.sourceToken;
    this.sourceTokenAmount = SwapController.state.sourceTokenAmount;
    this.sourceTokenPriceInUSD = SwapController.state.sourceTokenPriceInUSD;
    this.toToken = SwapController.state.toToken;
    this.toTokenAmount = SwapController.state.toTokenAmount;
    this.toTokenPriceInUSD = SwapController.state.toTokenPriceInUSD;
    this.inputError = SwapController.state.inputError;
    this.fetchError = SwapController.state.fetchError;
    this.lastTokenPriceUpdate = 0;
    this.minTokenPriceUpdateInterval = 1e4;
    this.visibilityChangeHandler = () => {
      if (document?.hidden) {
        clearInterval(this.interval);
        this.interval = void 0;
      } else {
        this.startTokenPriceInterval();
      }
    };
    this.startTokenPriceInterval = () => {
      if (this.interval && Date.now() - this.lastTokenPriceUpdate < this.minTokenPriceUpdateInterval) {
        return;
      }
      if (this.lastTokenPriceUpdate && Date.now() - this.lastTokenPriceUpdate > this.minTokenPriceUpdateInterval) {
        this.fetchTokensAndValues();
      }
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        this.fetchTokensAndValues();
      }, this.minTokenPriceUpdateInterval);
    };
    this.watchTokensAndValues = () => {
      if (!this.sourceToken || !this.toToken) {
        return;
      }
      this.subscribeToVisibilityChange();
      this.startTokenPriceInterval();
    };
    this.onDebouncedGetSwapCalldata = CoreHelperUtil.debounce(async () => {
      await SwapController.swapTokens();
    }, 200);
    this.subscribe({ resetSwapState: true, initializeSwapState: false })();
    this.unsubscribe.push(...[
      this.subscribe({ resetSwapState: false, initializeSwapState: true }),
      ModalController.subscribeKey("open", (isOpen) => {
        if (!isOpen) {
          SwapController.resetState();
        }
      }),
      RouterController.subscribeKey("view", (newRoute) => {
        if (!newRoute.includes("Swap")) {
          SwapController.resetValues();
        }
      }),
      SwapController.subscribe((newState) => {
        this.initialized = newState.initialized;
        this.loadingQuote = newState.loadingQuote;
        this.loadingPrices = newState.loadingPrices;
        this.loadingTransaction = newState.loadingTransaction;
        this.sourceToken = newState.sourceToken;
        this.sourceTokenAmount = newState.sourceTokenAmount;
        this.sourceTokenPriceInUSD = newState.sourceTokenPriceInUSD;
        this.toToken = newState.toToken;
        this.toTokenAmount = newState.toTokenAmount;
        this.toTokenPriceInUSD = newState.toTokenPriceInUSD;
        this.inputError = newState.inputError;
        this.fetchError = newState.fetchError;
        if (newState.sourceToken && newState.toToken) {
          this.watchTokensAndValues();
        }
      })
    ]);
  }
  async firstUpdated() {
    SwapController.initializeState();
    this.watchTokensAndValues();
    await this.handleSwapParameters();
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe?.());
    clearInterval(this.interval);
    document?.removeEventListener("visibilitychange", this.visibilityChangeHandler);
  }
  render() {
    return T`
      <wui-flex flexDirection="column" .padding=${["0", "4", "4", "4"]} gap="3">
        ${this.initialized ? this.templateSwap() : this.templateLoading()}
      </wui-flex>
    `;
  }
  subscribeToVisibilityChange() {
    document?.removeEventListener("visibilitychange", this.visibilityChangeHandler);
    document?.addEventListener("visibilitychange", this.visibilityChangeHandler);
  }
  fetchTokensAndValues() {
    SwapController.getNetworkTokenPrice();
    SwapController.getMyTokensWithBalance();
    SwapController.swapTokens();
    this.lastTokenPriceUpdate = Date.now();
  }
  templateSwap() {
    return T`
      <wui-flex flexDirection="column" gap="3">
        <wui-flex flexDirection="column" alignItems="center" gap="2" class="swap-inputs-container">
          ${this.templateTokenInput("sourceToken", this.sourceToken)}
          ${this.templateTokenInput("toToken", this.toToken)} ${this.templateReplaceTokensButton()}
        </wui-flex>
        ${this.templateDetails()} ${this.templateActionButton()}
      </wui-flex>
    `;
  }
  actionButtonLabel() {
    const haveNoAmount = !this.sourceTokenAmount || this.sourceTokenAmount === "0";
    if (this.fetchError) {
      return "Swap";
    }
    if (!this.sourceToken || !this.toToken) {
      return "Select token";
    }
    if (haveNoAmount) {
      return "Enter amount";
    }
    if (this.inputError) {
      return this.inputError;
    }
    return "Review swap";
  }
  templateReplaceTokensButton() {
    return T`
      <wui-flex class="replace-tokens-button-container">
        <wui-icon-box
          @click=${this.onSwitchTokens.bind(this)}
          icon="recycleHorizontal"
          size="md"
          variant="default"
        ></wui-icon-box>
      </wui-flex>
    `;
  }
  templateLoading() {
    return T`
      <wui-flex flexDirection="column" gap="4">
        <wui-flex flexDirection="column" alignItems="center" gap="2" class="swap-inputs-container">
          <w3m-swap-input-skeleton target="sourceToken"></w3m-swap-input-skeleton>
          <w3m-swap-input-skeleton target="toToken"></w3m-swap-input-skeleton>
          ${this.templateReplaceTokensButton()}
        </wui-flex>
        ${this.templateActionButton()}
      </wui-flex>
    `;
  }
  templateTokenInput(target, token) {
    const myToken = SwapController.state.myTokensWithBalance?.find((ct) => ct?.address === token?.address);
    const amount = target === "toToken" ? this.toTokenAmount : this.sourceTokenAmount;
    const price = target === "toToken" ? this.toTokenPriceInUSD : this.sourceTokenPriceInUSD;
    const marketValue = NumberUtil.parseLocalStringToNumber(amount) * price;
    return T`<w3m-swap-input
      .value=${target === "toToken" ? this.toTokenAmount : this.sourceTokenAmount}
      .disabled=${target === "toToken"}
      .onSetAmount=${this.handleChangeAmount.bind(this)}
      target=${target}
      .token=${token}
      .balance=${myToken?.quantity?.numeric}
      .price=${myToken?.price}
      .marketValue=${marketValue}
      .onSetMaxValue=${this.onSetMaxValue.bind(this)}
      ?autoFocus=${target === "sourceToken"}
    ></w3m-swap-input>`;
  }
  onSetMaxValue(target, balance) {
    const maxValue = NumberUtil.bigNumber(balance || "0");
    if (!maxValue.gt(0)) {
      this.handleChangeAmount(target, "0");
      return;
    }
    const token = target === "sourceToken" ? this.sourceToken : this.toToken;
    const decimals = token?.decimals ?? 18;
    const { networkAddress } = SwapController.getParams();
    const gasFee = SwapController.state.gasFee;
    if (target === "sourceToken" && token?.address === networkAddress && gasFee && gasFee !== "0") {
      const SWAP_GAS_LIMIT = 150000n;
      const gasCostWei = SWAP_GAS_LIMIT * BigInt(gasFee);
      const gasCost = NumberUtil.bigNumber(gasCostWei.toString()).div(NumberUtil.bigNumber(10).pow(decimals));
      const maxAfterGas = maxValue.minus(gasCost);
      this.handleChangeAmount(target, maxAfterGas.gt(0) ? maxAfterGas.toFixed(decimals, 0) : "0");
    } else {
      this.handleChangeAmount(target, maxValue.toFixed(decimals, 0));
    }
  }
  templateDetails() {
    if (!this.sourceToken || !this.toToken || this.inputError) {
      return null;
    }
    return T`<w3m-swap-details .detailsOpen=${this.detailsOpen}></w3m-swap-details>`;
  }
  handleChangeAmount(target, value) {
    SwapController.clearError();
    if (target === "sourceToken") {
      SwapController.setSourceTokenAmount(value);
    } else {
      SwapController.setToTokenAmount(value);
    }
    this.onDebouncedGetSwapCalldata();
  }
  templateActionButton() {
    const haveNoTokenSelected = !this.toToken || !this.sourceToken;
    const haveNoAmount = !this.sourceTokenAmount || this.sourceTokenAmount === "0";
    const loading = this.loadingQuote || this.loadingPrices || this.loadingTransaction;
    const disabled = loading || haveNoTokenSelected || haveNoAmount || this.inputError;
    return T` <wui-flex gap="2">
      <wui-button
        data-testid="swap-action-button"
        class="action-button"
        fullWidth
        size="lg"
        borderRadius="xs"
        variant="accent-primary"
        ?loading=${Boolean(loading)}
        ?disabled=${Boolean(disabled)}
        @click=${this.onSwapPreview.bind(this)}
      >
        ${this.actionButtonLabel()}
      </wui-button>
    </wui-flex>`;
  }
  async onSwitchTokens() {
    await SwapController.switchTokens();
  }
  async onSwapPreview() {
    if (this.fetchError) {
      await SwapController.swapTokens();
    }
    EventsController.sendEvent({
      type: "track",
      event: "INITIATE_SWAP",
      properties: {
        network: this.caipNetworkId || "",
        swapFromToken: this.sourceToken?.symbol || "",
        swapToToken: this.toToken?.symbol || "",
        swapFromAmount: this.sourceTokenAmount || "",
        swapToAmount: this.toTokenAmount || "",
        isSmartAccount: getPreferredAccountType(ChainController.state.activeChain) === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT
      }
    });
    RouterController.push("SwapPreview");
  }
  async handleSwapParameters() {
    if (!this.initialParams) {
      return;
    }
    if (!SwapController.state.initialized) {
      const waitForInitialization = new Promise((resolve) => {
        const unsubscribe = SwapController.subscribeKey("initialized", (initialized) => {
          if (initialized) {
            unsubscribe?.();
            resolve();
          }
        });
      });
      await waitForInitialization;
    }
    await this.setSwapParameters(this.initialParams);
  }
  async setSwapParameters({ amount, fromToken, toToken }) {
    if (!SwapController.state.tokens || !SwapController.state.myTokensWithBalance) {
      const waitForTokens = new Promise((resolve) => {
        const unsubscribe = SwapController.subscribeKey("myTokensWithBalance", (tokens) => {
          if (tokens && tokens.length > 0) {
            unsubscribe?.();
            resolve();
          }
        });
        setTimeout(() => {
          unsubscribe?.();
          resolve();
        }, 5e3);
      });
      await waitForTokens;
    }
    const allTokens = [
      ...SwapController.state.tokens || [],
      ...SwapController.state.myTokensWithBalance || []
    ];
    if (fromToken) {
      const token = allTokens.find((t) => t.symbol.toLowerCase() === fromToken.toLowerCase());
      if (token) {
        SwapController.setSourceToken(token);
      }
    }
    if (toToken) {
      const token = allTokens.find((t) => t.symbol.toLowerCase() === toToken.toLowerCase());
      if (token) {
        SwapController.setToToken(token);
      }
    }
    if (amount && !isNaN(Number(amount))) {
      SwapController.setSourceTokenAmount(amount);
    }
  }
  onCaipAddressChange({ newCaipAddress, resetSwapState, initializeSwapState }) {
    if (this.caipAddress !== newCaipAddress) {
      this.caipAddress = newCaipAddress;
      if (resetSwapState) {
        SwapController.resetState();
      }
      if (initializeSwapState) {
        SwapController.initializeState();
      }
    }
  }
  onCaipNetworkChange({ newCaipNetwork, resetSwapState, initializeSwapState }) {
    if (this.caipNetworkId !== newCaipNetwork?.caipNetworkId) {
      this.caipNetworkId = newCaipNetwork?.caipNetworkId;
      if (resetSwapState) {
        SwapController.resetState();
      }
      if (initializeSwapState) {
        SwapController.initializeState();
      }
    }
  }
};
W3mSwapView.styles = styles$u;
__decorate$y([
  n({ type: Object })
], W3mSwapView.prototype, "initialParams", void 0);
__decorate$y([
  r()
], W3mSwapView.prototype, "interval", void 0);
__decorate$y([
  r()
], W3mSwapView.prototype, "detailsOpen", void 0);
__decorate$y([
  r()
], W3mSwapView.prototype, "caipAddress", void 0);
__decorate$y([
  r()
], W3mSwapView.prototype, "caipNetworkId", void 0);
__decorate$y([
  r()
], W3mSwapView.prototype, "initialized", void 0);
__decorate$y([
  r()
], W3mSwapView.prototype, "loadingQuote", void 0);
__decorate$y([
  r()
], W3mSwapView.prototype, "loadingPrices", void 0);
__decorate$y([
  r()
], W3mSwapView.prototype, "loadingTransaction", void 0);
__decorate$y([
  r()
], W3mSwapView.prototype, "sourceToken", void 0);
__decorate$y([
  r()
], W3mSwapView.prototype, "sourceTokenAmount", void 0);
__decorate$y([
  r()
], W3mSwapView.prototype, "sourceTokenPriceInUSD", void 0);
__decorate$y([
  r()
], W3mSwapView.prototype, "toToken", void 0);
__decorate$y([
  r()
], W3mSwapView.prototype, "toTokenAmount", void 0);
__decorate$y([
  r()
], W3mSwapView.prototype, "toTokenPriceInUSD", void 0);
__decorate$y([
  r()
], W3mSwapView.prototype, "inputError", void 0);
__decorate$y([
  r()
], W3mSwapView.prototype, "fetchError", void 0);
__decorate$y([
  r()
], W3mSwapView.prototype, "lastTokenPriceUpdate", void 0);
W3mSwapView = __decorate$y([
  customElement("w3m-swap-view")
], W3mSwapView);
const styles$t = css`
  :host > wui-flex:first-child {
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  :host > wui-flex:first-child::-webkit-scrollbar {
    display: none;
  }

  .preview-container,
  .details-container {
    width: 100%;
  }

  .token-image {
    width: 24px;
    height: 24px;
    box-shadow: 0 0 0 2px ${({ tokens }) => tokens.core.glass010};
    border-radius: 12px;
  }

  wui-loading-hexagon {
    position: absolute;
  }

  .token-item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({ spacing }) => spacing["2"]};
    padding: ${({ spacing }) => spacing["2"]};
    height: 40px;
    border: none;
    border-radius: 80px;
    background: ${({ tokens }) => tokens.theme.foregroundPrimary};
    box-shadow: inset 0 0 0 1px ${({ tokens }) => tokens.theme.foregroundPrimary};
    cursor: pointer;
    transition: background ${({ durations }) => durations["lg"]}
      ${({ easings }) => easings["ease-out-power-2"]};
    will-change: background;
  }

  .token-item:hover {
    background: ${({ tokens }) => tokens.core.glass010};
  }

  .preview-token-details-container {
    width: 100%;
  }

  .details-row {
    width: 100%;
    padding: ${({ spacing }) => spacing["3"]} ${({ spacing }) => spacing["5"]};
    border-radius: ${({ borderRadius }) => borderRadius["3"]};
    background: ${({ tokens }) => tokens.theme.foregroundPrimary};
  }

  .action-buttons-container {
    width: 100%;
    gap: ${({ spacing }) => spacing["2"]};
  }

  .action-buttons-container > button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    height: 48px;
    border-radius: ${({ borderRadius }) => borderRadius["4"]};
    border: none;
    box-shadow: inset 0 0 0 1px ${({ tokens }) => tokens.core.glass010};
  }

  .action-buttons-container > button:disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }

  .action-button > wui-loading-spinner {
    display: inline-block;
  }

  .cancel-button:hover,
  .action-button:hover {
    cursor: pointer;
  }

  .action-buttons-container > wui-button.cancel-button {
    flex: 2;
  }

  .action-buttons-container > wui-button.action-button {
    flex: 4;
  }

  .action-buttons-container > button.action-button > wui-text {
    color: white;
  }

  .details-container > wui-flex {
    background: ${({ tokens }) => tokens.theme.foregroundPrimary};
    border-radius: ${({ borderRadius }) => borderRadius["3"]};
    width: 100%;
  }

  .details-container > wui-flex > button {
    border: none;
    background: none;
    padding: ${({ spacing }) => spacing["3"]};
    border-radius: ${({ borderRadius }) => borderRadius["3"]};
    transition: background ${({ durations }) => durations["lg"]}
      ${({ easings }) => easings["ease-out-power-2"]};
    will-change: background;
  }

  .details-container > wui-flex > button:hover {
    background: ${({ tokens }) => tokens.theme.foregroundPrimary};
  }

  .details-content-container {
    padding: ${({ spacing }) => spacing["2"]};
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .details-content-container > wui-flex {
    width: 100%;
  }

  .details-row {
    width: 100%;
    padding: ${({ spacing }) => spacing["3"]} ${({ spacing }) => spacing["5"]};
    border-radius: ${({ borderRadius }) => borderRadius["3"]};
    background: ${({ tokens }) => tokens.theme.foregroundPrimary};
  }
`;
var __decorate$x = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mSwapPreviewView = class W3mSwapPreviewView2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.detailsOpen = true;
    this.approvalTransaction = SwapController.state.approvalTransaction;
    this.swapTransaction = SwapController.state.swapTransaction;
    this.sourceToken = SwapController.state.sourceToken;
    this.sourceTokenAmount = SwapController.state.sourceTokenAmount ?? "";
    this.sourceTokenPriceInUSD = SwapController.state.sourceTokenPriceInUSD;
    this.balanceSymbol = ChainController.getAccountData()?.balanceSymbol;
    this.toToken = SwapController.state.toToken;
    this.toTokenAmount = SwapController.state.toTokenAmount ?? "";
    this.toTokenPriceInUSD = SwapController.state.toTokenPriceInUSD;
    this.caipNetwork = ChainController.state.activeCaipNetwork;
    this.inputError = SwapController.state.inputError;
    this.loadingQuote = SwapController.state.loadingQuote;
    this.loadingApprovalTransaction = SwapController.state.loadingApprovalTransaction;
    this.loadingBuildTransaction = SwapController.state.loadingBuildTransaction;
    this.loadingTransaction = SwapController.state.loadingTransaction;
    this.unsubscribe.push(...[
      ChainController.subscribeChainProp("accountState", (val) => {
        if (val?.balanceSymbol !== this.balanceSymbol) {
          RouterController.goBack();
        }
      }),
      ChainController.subscribeKey("activeCaipNetwork", (newCaipNetwork) => {
        if (this.caipNetwork !== newCaipNetwork) {
          this.caipNetwork = newCaipNetwork;
        }
      }),
      SwapController.subscribe((newState) => {
        this.approvalTransaction = newState.approvalTransaction;
        this.swapTransaction = newState.swapTransaction;
        this.sourceToken = newState.sourceToken;
        this.toToken = newState.toToken;
        this.toTokenPriceInUSD = newState.toTokenPriceInUSD;
        this.sourceTokenAmount = newState.sourceTokenAmount ?? "";
        this.toTokenAmount = newState.toTokenAmount ?? "";
        this.inputError = newState.inputError;
        if (newState.inputError) {
          RouterController.goBack();
        }
        this.loadingQuote = newState.loadingQuote;
        this.loadingApprovalTransaction = newState.loadingApprovalTransaction;
        this.loadingBuildTransaction = newState.loadingBuildTransaction;
        this.loadingTransaction = newState.loadingTransaction;
      })
    ]);
  }
  firstUpdated() {
    SwapController.getTransaction();
    this.refreshTransaction();
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe?.());
    clearInterval(this.interval);
  }
  render() {
    return T`
      <wui-flex flexDirection="column" .padding=${["0", "4", "4", "4"]} gap="3">
        ${this.templateSwap()}
      </wui-flex>
    `;
  }
  refreshTransaction() {
    this.interval = setInterval(() => {
      if (!SwapController.getApprovalLoadingState()) {
        SwapController.getTransaction();
      }
    }, 1e4);
  }
  templateSwap() {
    const sourceTokenText = `${NumberUtil.formatNumberToLocalString(parseFloat(this.sourceTokenAmount))} ${this.sourceToken?.symbol}`;
    const toTokenText = `${NumberUtil.formatNumberToLocalString(parseFloat(this.toTokenAmount))} ${this.toToken?.symbol}`;
    const sourceTokenValue = parseFloat(this.sourceTokenAmount) * this.sourceTokenPriceInUSD;
    const toTokenValue = parseFloat(this.toTokenAmount) * this.toTokenPriceInUSD;
    const sentPrice = NumberUtil.formatNumberToLocalString(sourceTokenValue);
    const receivePrice = NumberUtil.formatNumberToLocalString(toTokenValue);
    const loading = this.loadingQuote || this.loadingBuildTransaction || this.loadingTransaction || this.loadingApprovalTransaction;
    return T`
      <wui-flex flexDirection="column" alignItems="center" gap="4">
        <wui-flex class="preview-container" flexDirection="column" alignItems="flex-start" gap="4">
          <wui-flex
            class="preview-token-details-container"
            alignItems="center"
            justifyContent="space-between"
            gap="4"
          >
            <wui-flex flexDirection="column" alignItems="flex-start" gap="01">
              <wui-text variant="sm-regular" color="secondary">Send</wui-text>
              <wui-text variant="md-regular" color="primary">$${sentPrice}</wui-text>
            </wui-flex>
            <wui-token-button
              flexDirection="row-reverse"
              text=${sourceTokenText}
              imageSrc=${this.sourceToken?.logoUri}
            >
            </wui-token-button>
          </wui-flex>
          <wui-icon name="recycleHorizontal" color="default" size="md"></wui-icon>
          <wui-flex
            class="preview-token-details-container"
            alignItems="center"
            justifyContent="space-between"
            gap="4"
          >
            <wui-flex flexDirection="column" alignItems="flex-start" gap="01">
              <wui-text variant="sm-regular" color="secondary">Receive</wui-text>
              <wui-text variant="md-regular" color="primary">$${receivePrice}</wui-text>
            </wui-flex>
            <wui-token-button
              flexDirection="row-reverse"
              text=${toTokenText}
              imageSrc=${this.toToken?.logoUri}
            >
            </wui-token-button>
          </wui-flex>
        </wui-flex>

        ${this.templateDetails()}

        <wui-flex flexDirection="row" alignItems="center" justifyContent="center" gap="2">
          <wui-icon size="sm" color="default" name="info"></wui-icon>
          <wui-text variant="sm-regular" color="secondary">Review transaction carefully</wui-text>
        </wui-flex>

        <wui-flex
          class="action-buttons-container"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          gap="2"
        >
          <wui-button
            class="cancel-button"
            fullWidth
            size="lg"
            borderRadius="xs"
            variant="neutral-secondary"
            @click=${this.onCancelTransaction.bind(this)}
          >
            <wui-text variant="md-medium" color="secondary">Cancel</wui-text>
          </wui-button>
          <wui-button
            class="action-button"
            fullWidth
            size="lg"
            borderRadius="xs"
            variant="accent-primary"
            ?loading=${loading}
            ?disabled=${loading}
            @click=${this.onSendTransaction.bind(this)}
          >
            <wui-text variant="md-medium" color="invert"> ${this.actionButtonLabel()} </wui-text>
          </wui-button>
        </wui-flex>
      </wui-flex>
    `;
  }
  templateDetails() {
    if (!this.sourceToken || !this.toToken || this.inputError) {
      return null;
    }
    return T`<w3m-swap-details .detailsOpen=${this.detailsOpen}></w3m-swap-details>`;
  }
  actionButtonLabel() {
    if (this.loadingApprovalTransaction) {
      return "Approving...";
    }
    if (this.approvalTransaction) {
      return "Approve";
    }
    return "Swap";
  }
  onCancelTransaction() {
    RouterController.goBack();
  }
  onSendTransaction() {
    if (this.approvalTransaction) {
      SwapController.sendTransactionForApproval(this.approvalTransaction);
    } else {
      SwapController.sendTransactionForSwap(this.swapTransaction);
    }
  }
};
W3mSwapPreviewView.styles = styles$t;
__decorate$x([
  r()
], W3mSwapPreviewView.prototype, "interval", void 0);
__decorate$x([
  r()
], W3mSwapPreviewView.prototype, "detailsOpen", void 0);
__decorate$x([
  r()
], W3mSwapPreviewView.prototype, "approvalTransaction", void 0);
__decorate$x([
  r()
], W3mSwapPreviewView.prototype, "swapTransaction", void 0);
__decorate$x([
  r()
], W3mSwapPreviewView.prototype, "sourceToken", void 0);
__decorate$x([
  r()
], W3mSwapPreviewView.prototype, "sourceTokenAmount", void 0);
__decorate$x([
  r()
], W3mSwapPreviewView.prototype, "sourceTokenPriceInUSD", void 0);
__decorate$x([
  r()
], W3mSwapPreviewView.prototype, "balanceSymbol", void 0);
__decorate$x([
  r()
], W3mSwapPreviewView.prototype, "toToken", void 0);
__decorate$x([
  r()
], W3mSwapPreviewView.prototype, "toTokenAmount", void 0);
__decorate$x([
  r()
], W3mSwapPreviewView.prototype, "toTokenPriceInUSD", void 0);
__decorate$x([
  r()
], W3mSwapPreviewView.prototype, "caipNetwork", void 0);
__decorate$x([
  r()
], W3mSwapPreviewView.prototype, "inputError", void 0);
__decorate$x([
  r()
], W3mSwapPreviewView.prototype, "loadingQuote", void 0);
__decorate$x([
  r()
], W3mSwapPreviewView.prototype, "loadingApprovalTransaction", void 0);
__decorate$x([
  r()
], W3mSwapPreviewView.prototype, "loadingBuildTransaction", void 0);
__decorate$x([
  r()
], W3mSwapPreviewView.prototype, "loadingTransaction", void 0);
W3mSwapPreviewView = __decorate$x([
  customElement("w3m-swap-preview-view")
], W3mSwapPreviewView);
const styles$s = css`
  :host {
    --tokens-scroll--top-opacity: 0;
    --tokens-scroll--bottom-opacity: 1;
    --suggested-tokens-scroll--left-opacity: 0;
    --suggested-tokens-scroll--right-opacity: 1;
  }

  :host > wui-flex:first-child {
    overflow-y: hidden;
    overflow-x: hidden;
    scrollbar-width: none;
    scrollbar-height: none;
  }

  :host > wui-flex:first-child::-webkit-scrollbar {
    display: none;
  }

  wui-loading-hexagon {
    position: absolute;
  }

  .suggested-tokens-container {
    overflow-x: auto;
    mask-image: linear-gradient(
      to right,
      rgba(0, 0, 0, calc(1 - var(--suggested-tokens-scroll--left-opacity))) 0px,
      rgba(200, 200, 200, calc(1 - var(--suggested-tokens-scroll--left-opacity))) 1px,
      black 50px,
      black 90px,
      black calc(100% - 90px),
      black calc(100% - 50px),
      rgba(155, 155, 155, calc(1 - var(--suggested-tokens-scroll--right-opacity))) calc(100% - 1px),
      rgba(0, 0, 0, calc(1 - var(--suggested-tokens-scroll--right-opacity))) 100%
    );
  }

  .suggested-tokens-container::-webkit-scrollbar {
    display: none;
  }

  .tokens-container {
    border-top: 1px solid ${({ tokens }) => tokens.core.glass010};
    height: 100%;
    max-height: 390px;
  }

  .tokens {
    width: 100%;
    overflow-y: auto;
    mask-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, calc(1 - var(--tokens-scroll--top-opacity))) 0px,
      rgba(200, 200, 200, calc(1 - var(--tokens-scroll--top-opacity))) 1px,
      black 50px,
      black 90px,
      black calc(100% - 90px),
      black calc(100% - 50px),
      rgba(155, 155, 155, calc(1 - var(--tokens-scroll--bottom-opacity))) calc(100% - 1px),
      rgba(0, 0, 0, calc(1 - var(--tokens-scroll--bottom-opacity))) 100%
    );
  }

  .network-search-input,
  .select-network-button {
    height: 40px;
  }

  .select-network-button {
    border: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: ${({ spacing }) => spacing["2"]};
    box-shadow: inset 0 0 0 1px ${({ tokens }) => tokens.core.glass010};
    background-color: transparent;
    border-radius: ${({ borderRadius }) => borderRadius["3"]};
    padding: ${({ spacing }) => spacing["2"]};
    align-items: center;
    transition: background-color ${({ durations }) => durations["lg"]}
      ${({ easings }) => easings["ease-out-power-2"]};
    will-change: background-color;
  }

  .select-network-button:hover {
    background-color: ${({ tokens }) => tokens.theme.foregroundPrimary};
  }

  .select-network-button > wui-image {
    width: 26px;
    height: 26px;
    border-radius: ${({ borderRadius }) => borderRadius["4"]};
    box-shadow: inset 0 0 0 1px ${({ tokens }) => tokens.core.glass010};
  }
`;
var __decorate$w = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mSwapSelectTokenView = class W3mSwapSelectTokenView2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.targetToken = RouterController.state.data?.target;
    this.sourceToken = SwapController.state.sourceToken;
    this.sourceTokenAmount = SwapController.state.sourceTokenAmount;
    this.toToken = SwapController.state.toToken;
    this.myTokensWithBalance = SwapController.state.myTokensWithBalance;
    this.popularTokens = SwapController.state.popularTokens;
    this.suggestedTokens = SwapController.state.suggestedTokens;
    this.tokensLoading = SwapController.state.tokensLoading;
    this.searchValue = "";
    this.unsubscribe.push(SwapController.subscribe((newState) => {
      this.sourceToken = newState.sourceToken;
      this.toToken = newState.toToken;
      this.myTokensWithBalance = newState.myTokensWithBalance;
      this.popularTokens = newState.popularTokens;
      this.suggestedTokens = newState.suggestedTokens;
      this.tokensLoading = newState.tokensLoading;
    }));
  }
  async firstUpdated() {
    await SwapController.getTokenList();
  }
  updated() {
    const suggestedTokensContainer = this.renderRoot?.querySelector(".suggested-tokens-container");
    suggestedTokensContainer?.addEventListener("scroll", this.handleSuggestedTokensScroll.bind(this));
    const tokensList = this.renderRoot?.querySelector(".tokens");
    tokensList?.addEventListener("scroll", this.handleTokenListScroll.bind(this));
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    const suggestedTokensContainer = this.renderRoot?.querySelector(".suggested-tokens-container");
    const tokensList = this.renderRoot?.querySelector(".tokens");
    suggestedTokensContainer?.removeEventListener("scroll", this.handleSuggestedTokensScroll.bind(this));
    tokensList?.removeEventListener("scroll", this.handleTokenListScroll.bind(this));
    clearInterval(this.interval);
  }
  render() {
    return T`
      <wui-flex flexDirection="column" gap="3">
        ${this.templateSearchInput()} ${this.templateSuggestedTokens()} ${this.templateTokens()}
      </wui-flex>
    `;
  }
  onSelectToken(token) {
    if (this.targetToken === "sourceToken") {
      SwapController.setSourceToken(token);
    } else {
      SwapController.setToToken(token);
      if (this.sourceToken && this.sourceTokenAmount) {
        SwapController.swapTokens();
      }
    }
    RouterController.goBack();
  }
  templateSearchInput() {
    return T`
      <wui-flex .padding=${["1", "3", "0", "3"]} gap="2">
        <wui-input-text
          data-testid="swap-select-token-search-input"
          class="network-search-input"
          size="sm"
          placeholder="Search token"
          icon="search"
          .value=${this.searchValue}
          @inputChange=${this.onSearchInputChange.bind(this)}
        ></wui-input-text>
      </wui-flex>
    `;
  }
  templateMyTokens() {
    const yourTokens = this.myTokensWithBalance ? Object.values(this.myTokensWithBalance) : [];
    const filteredYourTokens = this.filterTokensWithText(yourTokens, this.searchValue);
    if (filteredYourTokens?.length > 0) {
      return T`<wui-flex justifyContent="flex-start" padding="2">
          <wui-text variant="md-medium" color="secondary">Your tokens</wui-text>
        </wui-flex>
        ${filteredYourTokens.map((token) => {
        const selected = token.symbol === this.sourceToken?.symbol || token.symbol === this.toToken?.symbol;
        return T`
            <wui-token-list-item
              data-testid="swap-select-token-item-${token.symbol}"
              name=${token.name}
              ?disabled=${selected}
              symbol=${token.symbol}
              price=${token?.price}
              amount=${token?.quantity?.numeric}
              imageSrc=${token.logoUri}
              @click=${() => {
          if (!selected) {
            this.onSelectToken(token);
          }
        }}
            >
            </wui-token-list-item>
          `;
      })}`;
    }
    return null;
  }
  templateAllTokens() {
    const tokens = this.popularTokens ? this.popularTokens : [];
    const filteredTokens = this.filterTokensWithText(tokens, this.searchValue);
    if (this.tokensLoading) {
      return T`
        <wui-token-list-item-loader></wui-token-list-item-loader>
        <wui-token-list-item-loader></wui-token-list-item-loader>
        <wui-token-list-item-loader></wui-token-list-item-loader>
        <wui-token-list-item-loader></wui-token-list-item-loader>
        <wui-token-list-item-loader></wui-token-list-item-loader>
      `;
    }
    if (filteredTokens?.length > 0) {
      return T`
        ${filteredTokens.map((token) => T`
            <wui-token-list-item
              data-testid="swap-select-token-item-${token.symbol}"
              name=${token.name}
              symbol=${token.symbol}
              imageSrc=${token.logoUri}
              @click=${() => this.onSelectToken(token)}
            >
            </wui-token-list-item>
          `)}
      `;
    }
    return null;
  }
  templateTokens() {
    return T`
      <wui-flex class="tokens-container">
        <wui-flex class="tokens" .padding=${["0", "2", "2", "2"]} flexDirection="column">
          ${this.templateMyTokens()}
          <wui-flex justifyContent="flex-start" padding="3">
            <wui-text variant="md-medium" color="secondary">Tokens</wui-text>
          </wui-flex>
          ${this.templateAllTokens()}
        </wui-flex>
      </wui-flex>
    `;
  }
  templateSuggestedTokens() {
    const tokens = this.suggestedTokens ? this.suggestedTokens.slice(0, 8) : null;
    if (this.tokensLoading) {
      return T`
        <wui-flex
          class="suggested-tokens-container"
          .padding=${["0", "3", "0", "3"]}
          gap="2"
        >
          <wui-token-button loading></wui-token-button>
          <wui-token-button loading></wui-token-button>
          <wui-token-button loading></wui-token-button>
          <wui-token-button loading></wui-token-button>
          <wui-token-button loading></wui-token-button>
        </wui-flex>
      `;
    }
    if (!tokens) {
      return null;
    }
    return T`
      <wui-flex
        class="suggested-tokens-container"
        .padding=${["0", "3", "0", "3"]}
        gap="2"
      >
        ${tokens.map((token) => T`
            <wui-token-button
              text=${token.symbol}
              imageSrc=${token.logoUri}
              @click=${() => this.onSelectToken(token)}
            >
            </wui-token-button>
          `)}
      </wui-flex>
    `;
  }
  onSearchInputChange(event) {
    this.searchValue = event.detail;
  }
  handleSuggestedTokensScroll() {
    const container = this.renderRoot?.querySelector(".suggested-tokens-container");
    if (!container) {
      return;
    }
    container.style.setProperty("--suggested-tokens-scroll--left-opacity", MathUtil.interpolate([0, 100], [0, 1], container.scrollLeft).toString());
    container.style.setProperty("--suggested-tokens-scroll--right-opacity", MathUtil.interpolate([0, 100], [0, 1], container.scrollWidth - container.scrollLeft - container.offsetWidth).toString());
  }
  handleTokenListScroll() {
    const container = this.renderRoot?.querySelector(".tokens");
    if (!container) {
      return;
    }
    container.style.setProperty("--tokens-scroll--top-opacity", MathUtil.interpolate([0, 100], [0, 1], container.scrollTop).toString());
    container.style.setProperty("--tokens-scroll--bottom-opacity", MathUtil.interpolate([0, 100], [0, 1], container.scrollHeight - container.scrollTop - container.offsetHeight).toString());
  }
  filterTokensWithText(tokens, text) {
    return tokens.filter((token) => `${token.symbol} ${token.name} ${token.address}`.toLowerCase().includes(text.toLowerCase())).sort((a, b) => {
      const aText = `${a.symbol} ${a.name} ${a.address}`.toLowerCase();
      const bText = `${b.symbol} ${b.name} ${b.address}`.toLowerCase();
      const aIndex = aText.indexOf(text.toLowerCase());
      const bIndex = bText.indexOf(text.toLowerCase());
      return aIndex - bIndex;
    });
  }
};
W3mSwapSelectTokenView.styles = styles$s;
__decorate$w([
  r()
], W3mSwapSelectTokenView.prototype, "interval", void 0);
__decorate$w([
  r()
], W3mSwapSelectTokenView.prototype, "targetToken", void 0);
__decorate$w([
  r()
], W3mSwapSelectTokenView.prototype, "sourceToken", void 0);
__decorate$w([
  r()
], W3mSwapSelectTokenView.prototype, "sourceTokenAmount", void 0);
__decorate$w([
  r()
], W3mSwapSelectTokenView.prototype, "toToken", void 0);
__decorate$w([
  r()
], W3mSwapSelectTokenView.prototype, "myTokensWithBalance", void 0);
__decorate$w([
  r()
], W3mSwapSelectTokenView.prototype, "popularTokens", void 0);
__decorate$w([
  r()
], W3mSwapSelectTokenView.prototype, "suggestedTokens", void 0);
__decorate$w([
  r()
], W3mSwapSelectTokenView.prototype, "tokensLoading", void 0);
__decorate$w([
  r()
], W3mSwapSelectTokenView.prototype, "searchValue", void 0);
W3mSwapSelectTokenView = __decorate$w([
  customElement("w3m-swap-select-token-view")
], W3mSwapSelectTokenView);
const swaps = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get W3mSwapPreviewView() {
    return W3mSwapPreviewView;
  },
  get W3mSwapSelectTokenView() {
    return W3mSwapSelectTokenView;
  },
  get W3mSwapView() {
    return W3mSwapView;
  }
});
const styles$r = css`
  :host {
    width: 100%;
    height: 100px;
    border-radius: ${({ borderRadius }) => borderRadius["5"]};
    border: 1px solid ${({ tokens }) => tokens.theme.foregroundPrimary};
    background-color: ${({ tokens }) => tokens.theme.foregroundPrimary};
    transition: background-color ${({ durations }) => durations["lg"]}
      ${({ easings }) => easings["ease-out-power-1"]};
    will-change: background-color;
    position: relative;
  }

  :host(:hover) {
    background-color: ${({ tokens }) => tokens.theme.foregroundSecondary};
  }

  wui-flex {
    width: 100%;
    height: fit-content;
  }

  wui-button {
    display: ruby;
    color: ${({ tokens }) => tokens.theme.textPrimary};
    margin: 0 ${({ spacing }) => spacing["2"]};
  }

  .instruction {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
  }

  .paste {
    display: inline-flex;
  }

  textarea {
    background: transparent;
    width: 100%;
    font-family: ${({ fontFamily }) => fontFamily.regular};
    font-style: normal;
    font-size: ${({ textSize }) => textSize.large};
    font-weight: ${({ fontWeight }) => fontWeight.regular};
    line-height: ${({ typography }) => typography["lg-regular"].lineHeight};
    letter-spacing: ${({ typography }) => typography["lg-regular"].letterSpacing};
    color: ${({ tokens }) => tokens.theme.textPrimary};
    caret-color: ${({ tokens }) => tokens.core.backgroundAccentPrimary};
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: textfield;
    padding: 0px;
    border: none;
    outline: none;
    appearance: none;
    resize: none;
    overflow: hidden;
  }
`;
var __decorate$v = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mInputAddress = class W3mInputAddress2 extends i {
  constructor() {
    super(...arguments);
    this.inputElementRef = e$1();
    this.instructionElementRef = e$1();
    this.readOnly = false;
    this.instructionHidden = Boolean(this.value);
    this.pasting = false;
    this.onDebouncedSearch = CoreHelperUtil.debounce(async (value) => {
      if (!value.length) {
        this.setReceiverAddress("");
        return;
      }
      const activeChain = ChainController.state.activeChain;
      const isValidAddress = CoreHelperUtil.isAddress(value, activeChain);
      if (isValidAddress) {
        this.setReceiverAddress(value);
        return;
      }
      try {
        const resolvedAddress = await ConnectionController.getEnsAddress(value);
        if (resolvedAddress) {
          SendController.setReceiverProfileName(value);
          SendController.setReceiverAddress(resolvedAddress);
          const avatar = await ConnectionController.getEnsAvatar(value);
          SendController.setReceiverProfileImageUrl(avatar || void 0);
        }
      } catch (error) {
        this.setReceiverAddress(value);
      } finally {
        SendController.setLoading(false);
      }
    });
  }
  firstUpdated() {
    if (this.value) {
      this.instructionHidden = true;
    }
    this.checkHidden();
  }
  render() {
    if (this.readOnly) {
      return T` <wui-flex
        flexDirection="column"
        justifyContent="center"
        gap="01"
        .padding=${["8", "4", "5", "4"]}
      >
        <textarea
          spellcheck="false"
          ?disabled=${true}
          autocomplete="off"
          .value=${this.value ?? ""}
        ></textarea>
      </wui-flex>`;
    }
    return T` <wui-flex
      @click=${this.onBoxClick.bind(this)}
      flexDirection="column"
      justifyContent="center"
      gap="01"
      .padding=${["8", "4", "5", "4"]}
    >
      <wui-text
        ${n$1(this.instructionElementRef)}
        class="instruction"
        color="secondary"
        variant="md-medium"
      >
        Type or
        <wui-button
          class="paste"
          size="md"
          variant="neutral-secondary"
          iconLeft="copy"
          @click=${this.onPasteClick.bind(this)}
        >
          <wui-icon size="sm" color="inherit" slot="iconLeft" name="copy"></wui-icon>
          Paste
        </wui-button>
        address
      </wui-text>
      <textarea
        spellcheck="false"
        ?disabled=${!this.instructionHidden}
        ${n$1(this.inputElementRef)}
        @input=${this.onInputChange.bind(this)}
        @blur=${this.onBlur.bind(this)}
        .value=${this.value ?? ""}
        autocomplete="off"
      ></textarea>
    </wui-flex>`;
  }
  async focusInput() {
    if (this.instructionElementRef.value) {
      this.instructionHidden = true;
      await this.toggleInstructionFocus(false);
      this.instructionElementRef.value.style.pointerEvents = "none";
      this.inputElementRef.value?.focus();
      if (this.inputElementRef.value) {
        this.inputElementRef.value.selectionStart = this.inputElementRef.value.selectionEnd = this.inputElementRef.value.value.length;
      }
    }
  }
  async focusInstruction() {
    if (this.instructionElementRef.value) {
      this.instructionHidden = false;
      await this.toggleInstructionFocus(true);
      this.instructionElementRef.value.style.pointerEvents = "auto";
      this.inputElementRef.value?.blur();
    }
  }
  async toggleInstructionFocus(focus) {
    if (this.instructionElementRef.value) {
      await this.instructionElementRef.value.animate([{ opacity: focus ? 0 : 1 }, { opacity: focus ? 1 : 0 }], {
        duration: 100,
        easing: "ease",
        fill: "forwards"
      }).finished;
    }
  }
  onBoxClick() {
    if (!this.value && !this.instructionHidden) {
      this.focusInput();
    }
  }
  onBlur() {
    if (!this.value && this.instructionHidden && !this.pasting) {
      this.focusInstruction();
    }
  }
  checkHidden() {
    if (this.instructionHidden) {
      this.focusInput();
    }
  }
  async onPasteClick() {
    this.pasting = true;
    const text = await navigator.clipboard.readText();
    SendController.setReceiverAddress(text);
    this.focusInput();
  }
  onInputChange(e2) {
    const element = e2.target;
    this.pasting = false;
    this.value = e2.target?.value;
    if (element.value && !this.instructionHidden) {
      this.focusInput();
    }
    SendController.setLoading(true);
    this.onDebouncedSearch(element.value);
  }
  setReceiverAddress(address) {
    SendController.setReceiverAddress(address);
    SendController.setReceiverProfileName(void 0);
    SendController.setReceiverProfileImageUrl(void 0);
    SendController.setLoading(false);
  }
};
W3mInputAddress.styles = styles$r;
__decorate$v([
  n()
], W3mInputAddress.prototype, "value", void 0);
__decorate$v([
  n({ type: Boolean })
], W3mInputAddress.prototype, "readOnly", void 0);
__decorate$v([
  r()
], W3mInputAddress.prototype, "instructionHidden", void 0);
__decorate$v([
  r()
], W3mInputAddress.prototype, "pasting", void 0);
W3mInputAddress = __decorate$v([
  customElement("w3m-input-address")
], W3mInputAddress);
const styles$q = css`
  :host {
    width: 100%;
    height: 100px;
    border-radius: ${({ borderRadius }) => borderRadius["5"]};
    border: 1px solid ${({ tokens }) => tokens.theme.foregroundPrimary};
    background-color: ${({ tokens }) => tokens.theme.foregroundPrimary};
    transition: background-color ${({ durations }) => durations["lg"]}
      ${({ easings }) => easings["ease-out-power-1"]};
    will-change: background-color;
    transition: all ${({ easings }) => easings["ease-out-power-1"]}
      ${({ durations }) => durations["lg"]};
  }

  :host(:hover) {
    background-color: ${({ tokens }) => tokens.theme.foregroundSecondary};
  }

  wui-flex {
    width: 100%;
    height: fit-content;
  }

  wui-button {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  wui-input-amount {
    mask-image: linear-gradient(
      270deg,
      transparent 0px,
      transparent 8px,
      black 24px,
      black 25px,
      black 32px,
      black 100%
    );
  }

  .totalValue {
    width: 100%;
  }
`;
var __decorate$u = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mInputToken = class W3mInputToken2 extends i {
  constructor() {
    super(...arguments);
    this.readOnly = false;
    this.isInsufficientBalance = false;
  }
  render() {
    const isDisabled = this.readOnly || !this.token;
    return T` <wui-flex
      flexDirection="column"
      gap="01"
      .padding=${["5", "3", "4", "3"]}
    >
      <wui-flex alignItems="center">
        <wui-input-amount
          @inputChange=${this.onInputChange.bind(this)}
          ?disabled=${isDisabled}
          .value=${this.sendTokenAmount ?? ""}
          ?error=${Boolean(this.isInsufficientBalance)}
        ></wui-input-amount>
        ${this.buttonTemplate()}
      </wui-flex>
      ${this.bottomTemplate()}
    </wui-flex>`;
  }
  buttonTemplate() {
    if (this.token) {
      return T`<wui-token-button
        text=${this.token.symbol}
        imageSrc=${this.token.iconUrl}
        @click=${this.handleSelectButtonClick.bind(this)}
      >
      </wui-token-button>`;
    }
    return T`<wui-button
      size="md"
      variant="neutral-secondary"
      @click=${this.handleSelectButtonClick.bind(this)}
      >Select token</wui-button
    >`;
  }
  handleSelectButtonClick() {
    if (!this.readOnly) {
      RouterController.push("WalletSendSelectToken");
    }
  }
  sendValueTemplate() {
    if (!this.readOnly && this.token && this.sendTokenAmount) {
      const price = this.token.price;
      const totalValue = price * Number(this.sendTokenAmount);
      return T`<wui-text class="totalValue" variant="sm-regular" color="secondary"
        >${totalValue ? `$${NumberUtil.formatNumberToLocalString(totalValue, 2)}` : "Incorrect value"}</wui-text
      >`;
    }
    return null;
  }
  maxAmountTemplate() {
    if (this.token) {
      return T` <wui-text variant="sm-regular" color="secondary">
        ${UiHelperUtil.roundNumber(Number(this.token.quantity.numeric), 6, 5)}
      </wui-text>`;
    }
    return null;
  }
  actionTemplate() {
    if (this.token) {
      return T`<wui-link @click=${this.onMaxClick.bind(this)}>Max</wui-link>`;
    }
    return null;
  }
  bottomTemplate() {
    if (this.readOnly) {
      return null;
    }
    return T`<wui-flex alignItems="center" justifyContent="space-between">
      ${this.sendValueTemplate()}
      <wui-flex alignItems="center" gap="01" justifyContent="flex-end">
        ${this.maxAmountTemplate()} ${this.actionTemplate()}
      </wui-flex>
    </wui-flex>`;
  }
  onInputChange(event) {
    SendController.setTokenAmount(String(event.detail));
  }
  onMaxClick() {
    if (this.token) {
      const decimals = Number(this.token.quantity.decimals);
      const maxValue = NumberUtil.bigNumber(this.token.quantity.numeric);
      if (!this.token.address && this.gasPrice) {
        const ETH_TRANSFER_GAS_LIMIT = 65000n;
        const gasCostWei = ETH_TRANSFER_GAS_LIMIT * BigInt(this.gasPrice);
        const gasCost = NumberUtil.bigNumber(gasCostWei.toString()).div(NumberUtil.bigNumber(10).pow(decimals));
        const maxAfterGas = maxValue.minus(gasCost);
        SendController.setTokenAmount(maxAfterGas.gt(0) ? maxAfterGas.toFixed(decimals, 0) : "0");
      } else {
        SendController.setTokenAmount(maxValue.toFixed(decimals, 0));
      }
    }
  }
};
W3mInputToken.styles = styles$q;
__decorate$u([
  n({ type: Object })
], W3mInputToken.prototype, "token", void 0);
__decorate$u([
  n({ type: Boolean })
], W3mInputToken.prototype, "readOnly", void 0);
__decorate$u([
  n({ type: String })
], W3mInputToken.prototype, "sendTokenAmount", void 0);
__decorate$u([
  n({ type: Boolean })
], W3mInputToken.prototype, "isInsufficientBalance", void 0);
__decorate$u([
  n({ type: String })
], W3mInputToken.prototype, "gasPrice", void 0);
W3mInputToken = __decorate$u([
  customElement("w3m-input-token")
], W3mInputToken);
const styles$p = css`
  :host {
    display: block;
  }

  wui-flex {
    position: relative;
  }

  wui-icon-box {
    width: 32px;
    height: 32px;
    border-radius: ${({ borderRadius }) => borderRadius["10"]} !important;
    border: 4px solid ${({ tokens }) => tokens.theme.backgroundPrimary};
    background: ${({ tokens }) => tokens.theme.foregroundPrimary};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
  }

  wui-button {
    --local-border-radius: ${({ borderRadius }) => borderRadius["4"]} !important;
  }

  .inputContainer {
    height: fit-content;
  }
`;
var __decorate$t = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
const SEND_BUTTON_MESSAGE = {
  INSUFFICIENT_FUNDS: "Insufficient Funds",
  INCORRECT_VALUE: "Incorrect Value",
  INVALID_ADDRESS: "Invalid Address",
  ADD_ADDRESS: "Add Address",
  ADD_AMOUNT: "Add Amount",
  SELECT_TOKEN: "Select Token",
  PREVIEW_SEND: "Preview Send"
};
let W3mWalletSendView = class W3mWalletSendView2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.isTryingToChooseDifferentWallet = false;
    this.token = SendController.state.token;
    this.sendTokenAmount = SendController.state.sendTokenAmount;
    this.receiverAddress = SendController.state.receiverAddress;
    this.receiverProfileName = SendController.state.receiverProfileName;
    this.loading = SendController.state.loading;
    this.params = RouterController.state.data?.send;
    this.caipAddress = ChainController.getAccountData()?.caipAddress;
    this.disconnecting = false;
    this.gasFee = SwapController.state.gasFee;
    if (this.token && !this.params) {
      this.fetchBalances();
      this.fetchNetworkPrice();
    }
    const unsubscribe = ChainController.subscribeKey("activeCaipAddress", (val) => {
      if (!val && this.isTryingToChooseDifferentWallet) {
        this.isTryingToChooseDifferentWallet = false;
        ModalController.open({
          view: "Connect",
          data: {
            redirectView: "WalletSend"
          }
        }).catch(() => null);
        unsubscribe();
      }
    });
    this.unsubscribe.push(...[
      ChainController.subscribeAccountStateProp("caipAddress", (val) => {
        this.caipAddress = val;
      }),
      SendController.subscribe((val) => {
        this.token = val.token;
        this.sendTokenAmount = val.sendTokenAmount;
        this.receiverAddress = val.receiverAddress;
        this.receiverProfileName = val.receiverProfileName;
        this.loading = val.loading;
      }),
      SwapController.subscribeKey("gasFee", (val) => {
        this.gasFee = val;
      })
    ]);
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  async firstUpdated() {
    await this.handleSendParameters();
  }
  render() {
    const message = this.getMessage();
    const isReadOnly = Boolean(this.params);
    return T` <wui-flex flexDirection="column" .padding=${["0", "4", "4", "4"]}>
      <wui-flex class="inputContainer" gap="2" flexDirection="column">
        <w3m-input-token
          .token=${this.token}
          .sendTokenAmount=${this.sendTokenAmount}
          .gasPrice=${this.gasFee}
          ?readOnly=${isReadOnly}
          ?isInsufficientBalance=${message === SEND_BUTTON_MESSAGE.INSUFFICIENT_FUNDS}
        ></w3m-input-token>
        <wui-icon-box size="md" variant="secondary" icon="arrowBottom"></wui-icon-box>
        <w3m-input-address
          ?readOnly=${isReadOnly}
          .value=${this.receiverProfileName ? this.receiverProfileName : this.receiverAddress}
        ></w3m-input-address>
      </wui-flex>
      ${this.buttonTemplate(message)}
    </wui-flex>`;
  }
  async fetchBalances() {
    await SendController.fetchTokenBalance();
    SendController.fetchNetworkBalance();
  }
  async fetchNetworkPrice() {
    await SwapController.getNetworkTokenPrice();
    await SwapController.getInitialGasPrice();
  }
  onButtonClick() {
    RouterController.push("WalletSendPreview", {
      send: this.params
    });
  }
  onFundWalletClick() {
    RouterController.push("FundWallet", {
      redirectView: "WalletSend"
    });
  }
  async onConnectDifferentWalletClick() {
    try {
      this.isTryingToChooseDifferentWallet = true;
      this.disconnecting = true;
      await ConnectionController.disconnect();
    } finally {
      this.disconnecting = false;
    }
  }
  getMessage() {
    if (!this.token) {
      return SEND_BUTTON_MESSAGE.SELECT_TOKEN;
    }
    if (!this.sendTokenAmount) {
      return SEND_BUTTON_MESSAGE.ADD_AMOUNT;
    }
    if (this.token.price) {
      const value = Number(this.sendTokenAmount) * this.token.price;
      if (!value) {
        return SEND_BUTTON_MESSAGE.INCORRECT_VALUE;
      }
    }
    if (NumberUtil.bigNumber(this.sendTokenAmount).gt(this.token.quantity.numeric)) {
      return SEND_BUTTON_MESSAGE.INSUFFICIENT_FUNDS;
    }
    if (!this.receiverAddress) {
      return SEND_BUTTON_MESSAGE.ADD_ADDRESS;
    }
    if (!CoreHelperUtil.isAddress(this.receiverAddress, ChainController.state.activeChain)) {
      return SEND_BUTTON_MESSAGE.INVALID_ADDRESS;
    }
    return SEND_BUTTON_MESSAGE.PREVIEW_SEND;
  }
  buttonTemplate(message) {
    const isDisabled = !message.startsWith(SEND_BUTTON_MESSAGE.PREVIEW_SEND);
    const isInsufficientBalance = message === SEND_BUTTON_MESSAGE.INSUFFICIENT_FUNDS;
    const isReadOnly = Boolean(this.params);
    if (isInsufficientBalance && !isReadOnly) {
      return T`
        <wui-flex .margin=${["4", "0", "0", "0"]} flexDirection="column" gap="4">
          <wui-button
            @click=${this.onFundWalletClick.bind(this)}
            size="lg"
            variant="accent-secondary"
            fullWidth
          >
            Fund Wallet
          </wui-button>

          <wui-separator data-testid="wui-separator" text="or"></wui-separator>

          <wui-button
            @click=${this.onConnectDifferentWalletClick.bind(this)}
            size="lg"
            variant="neutral-secondary"
            fullWidth
            ?loading=${this.disconnecting}
          >
            Connect a different wallet
          </wui-button>
        </wui-flex>
      `;
    }
    return T`<wui-flex .margin=${["4", "0", "0", "0"]}>
      <wui-button
        @click=${this.onButtonClick.bind(this)}
        ?disabled=${isDisabled}
        size="lg"
        variant="accent-primary"
        ?loading=${this.loading}
        fullWidth
      >
        ${message}
      </wui-button>
    </wui-flex>`;
  }
  async handleSendParameters() {
    this.loading = true;
    if (!this.params) {
      this.loading = false;
      return;
    }
    const amount = Number(this.params.amount);
    if (isNaN(amount)) {
      SnackController.showError("Invalid amount");
      this.loading = false;
      return;
    }
    const { namespace, chainId, assetAddress } = this.params;
    if (!ConstantsUtil$2.SEND_PARAMS_SUPPORTED_CHAINS.includes(namespace)) {
      SnackController.showError(`Chain "${namespace}" is not supported for send parameters`);
      this.loading = false;
      return;
    }
    const caipNetwork = ChainController.getCaipNetworkById(chainId, namespace);
    if (!caipNetwork) {
      SnackController.showError(`Network with id "${chainId}" not found`);
      this.loading = false;
      return;
    }
    try {
      const { balance, name, symbol, decimals } = await BalanceUtil.fetchERC20Balance({
        caipAddress: this.caipAddress,
        assetAddress,
        caipNetwork
      });
      if (!name || !symbol || !decimals || !balance) {
        SnackController.showError("Token not found");
        return;
      }
      SendController.setToken({
        name,
        symbol,
        chainId: caipNetwork.id.toString(),
        address: `${caipNetwork.chainNamespace}:${caipNetwork.id}:${assetAddress}`,
        value: 0,
        price: 0,
        quantity: {
          decimals: decimals.toString(),
          numeric: balance.toString()
        },
        iconUrl: AssetUtil.getTokenImage(symbol) ?? ""
      });
      SendController.setTokenAmount(String(amount));
      SendController.setReceiverAddress(this.params.to);
    } catch (err) {
      console.error("Failed to load token information:", err);
      SnackController.showError("Failed to load token information");
    } finally {
      this.loading = false;
    }
  }
};
W3mWalletSendView.styles = styles$p;
__decorate$t([
  r()
], W3mWalletSendView.prototype, "token", void 0);
__decorate$t([
  r()
], W3mWalletSendView.prototype, "sendTokenAmount", void 0);
__decorate$t([
  r()
], W3mWalletSendView.prototype, "receiverAddress", void 0);
__decorate$t([
  r()
], W3mWalletSendView.prototype, "receiverProfileName", void 0);
__decorate$t([
  r()
], W3mWalletSendView.prototype, "loading", void 0);
__decorate$t([
  r()
], W3mWalletSendView.prototype, "params", void 0);
__decorate$t([
  r()
], W3mWalletSendView.prototype, "caipAddress", void 0);
__decorate$t([
  r()
], W3mWalletSendView.prototype, "disconnecting", void 0);
__decorate$t([
  r()
], W3mWalletSendView.prototype, "gasFee", void 0);
W3mWalletSendView = __decorate$t([
  customElement("w3m-wallet-send-view")
], W3mWalletSendView);
const styles$o = css`
  .contentContainer {
    height: 440px;
    overflow: scroll;
    scrollbar-width: none;
  }

  .contentContainer::-webkit-scrollbar {
    display: none;
  }

  wui-icon-box {
    width: 40px;
    height: 40px;
    border-radius: ${({ borderRadius }) => borderRadius["3"]};
  }
`;
var __decorate$s = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mSendSelectTokenView = class W3mSendSelectTokenView2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.tokenBalances = SendController.state.tokenBalances;
    this.search = "";
    this.onDebouncedSearch = CoreHelperUtil.debounce((value) => {
      this.search = value;
    });
    this.fetchBalancesAndNetworkPrice();
    this.unsubscribe.push(...[
      SendController.subscribe((val) => {
        this.tokenBalances = val.tokenBalances;
      })
    ]);
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    return T`
      <wui-flex flexDirection="column">
        ${this.templateSearchInput()} <wui-separator></wui-separator> ${this.templateTokens()}
      </wui-flex>
    `;
  }
  async fetchBalancesAndNetworkPrice() {
    if (!this.tokenBalances || this.tokenBalances?.length === 0) {
      await this.fetchBalances();
      await this.fetchNetworkPrice();
    }
  }
  async fetchBalances() {
    await SendController.fetchTokenBalance();
    SendController.fetchNetworkBalance();
  }
  async fetchNetworkPrice() {
    await SwapController.getNetworkTokenPrice();
  }
  templateSearchInput() {
    return T`
      <wui-flex gap="2" padding="3">
        <wui-input-text
          @inputChange=${this.onInputChange.bind(this)}
          class="network-search-input"
          size="sm"
          placeholder="Search token"
          icon="search"
        ></wui-input-text>
      </wui-flex>
    `;
  }
  templateTokens() {
    this.tokens = this.tokenBalances?.filter((token) => token.chainId === ChainController.state.activeCaipNetwork?.caipNetworkId);
    if (this.search) {
      this.filteredTokens = this.tokenBalances?.filter((token) => token.name.toLowerCase().includes(this.search.toLowerCase()));
    } else {
      this.filteredTokens = this.tokens;
    }
    return T`
      <wui-flex
        class="contentContainer"
        flexDirection="column"
        .padding=${["0", "3", "0", "3"]}
      >
        <wui-flex justifyContent="flex-start" .padding=${["4", "3", "3", "3"]}>
          <wui-text variant="md-medium" color="secondary">Your tokens</wui-text>
        </wui-flex>
        <wui-flex flexDirection="column" gap="2">
          ${this.filteredTokens && this.filteredTokens.length > 0 ? this.filteredTokens.map((token) => T`<wui-list-token
                    @click=${this.handleTokenClick.bind(this, token)}
                    ?clickable=${true}
                    tokenName=${token.name}
                    tokenImageUrl=${token.iconUrl}
                    tokenAmount=${token.quantity.numeric}
                    tokenValue=${token.value}
                    tokenCurrency=${token.symbol}
                  ></wui-list-token>`) : T`<wui-flex
                .padding=${["20", "0", "0", "0"]}
                alignItems="center"
                flexDirection="column"
                gap="4"
              >
                <wui-icon-box icon="coinPlaceholder" color="default" size="lg"></wui-icon-box>
                <wui-flex
                  class="textContent"
                  gap="2"
                  flexDirection="column"
                  justifyContent="center"
                  flexDirection="column"
                >
                  <wui-text variant="lg-medium" align="center" color="primary">
                    No tokens found
                  </wui-text>
                  <wui-text variant="lg-regular" align="center" color="secondary">
                    Your tokens will appear here
                  </wui-text>
                </wui-flex>
                <wui-link @click=${this.onBuyClick.bind(this)}>Buy</wui-link>
              </wui-flex>`}
        </wui-flex>
      </wui-flex>
    `;
  }
  onBuyClick() {
    RouterController.push("OnRampProviders");
  }
  onInputChange(event) {
    this.onDebouncedSearch(event.detail);
  }
  handleTokenClick(token) {
    SendController.setToken(token);
    SendController.setTokenAmount(void 0);
    RouterController.goBack();
  }
};
W3mSendSelectTokenView.styles = styles$o;
__decorate$s([
  r()
], W3mSendSelectTokenView.prototype, "tokenBalances", void 0);
__decorate$s([
  r()
], W3mSendSelectTokenView.prototype, "tokens", void 0);
__decorate$s([
  r()
], W3mSendSelectTokenView.prototype, "filteredTokens", void 0);
__decorate$s([
  r()
], W3mSendSelectTokenView.prototype, "search", void 0);
W3mSendSelectTokenView = __decorate$s([
  customElement("w3m-wallet-send-select-token-view")
], W3mSendSelectTokenView);
const styles$n = css`
  :host {
    display: flex;
    width: auto;
    flex-direction: column;
    gap: ${({ spacing }) => spacing["1"]};
    border-radius: ${({ borderRadius }) => borderRadius["5"]};
    background: ${({ tokens }) => tokens.theme.foregroundPrimary};
    padding: ${({ spacing }) => spacing["3"]} ${({ spacing }) => spacing["2"]}
      ${({ spacing }) => spacing["2"]} ${({ spacing }) => spacing["2"]};
  }

  wui-list-content {
    width: -webkit-fill-available !important;
  }

  wui-text {
    padding: 0 ${({ spacing }) => spacing["2"]};
  }

  wui-flex {
    margin-top: ${({ spacing }) => spacing["2"]};
  }

  .network {
    cursor: pointer;
    transition: background-color ${({ durations }) => durations["lg"]}
      ${({ easings }) => easings["ease-out-power-1"]};
    will-change: background-color;
  }

  .network:focus-visible {
    border: 1px solid ${({ tokens }) => tokens.core.textAccentPrimary};
    background-color: ${({ tokens }) => tokens.core.glass010};
    -webkit-box-shadow: 0px 0px 0px 4px ${({ tokens }) => tokens.core.foregroundAccent010};
    -moz-box-shadow: 0px 0px 0px 4px ${({ tokens }) => tokens.core.foregroundAccent010};
    box-shadow: 0px 0px 0px 4px ${({ tokens }) => tokens.core.foregroundAccent010};
  }

  .network:hover {
    background-color: ${({ tokens }) => tokens.core.glass010};
  }

  .network:active {
    background-color: ${({ tokens }) => tokens.core.glass010};
  }
`;
var __decorate$r = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mWalletSendDetails = class W3mWalletSendDetails2 extends i {
  constructor() {
    super(...arguments);
    this.params = RouterController.state.data?.send;
  }
  render() {
    return T` <wui-text variant="sm-regular" color="secondary">Details</wui-text>
      <wui-flex flexDirection="column" gap="1">
        <wui-list-content
          textTitle="Address"
          textValue=${UiHelperUtil.getTruncateString({
      string: this.receiverAddress ?? "",
      charsStart: 4,
      charsEnd: 4,
      truncate: "middle"
    })}
        >
        </wui-list-content>
        ${this.networkTemplate()}
      </wui-flex>`;
  }
  networkTemplate() {
    if (this.caipNetwork?.name) {
      return T` <wui-list-content
        @click=${() => this.onNetworkClick(this.caipNetwork)}
        class="network"
        textTitle="Network"
        imageSrc=${o(AssetUtil.getNetworkImage(this.caipNetwork))}
      ></wui-list-content>`;
    }
    return null;
  }
  onNetworkClick(network) {
    if (network && !this.params) {
      RouterController.push("Networks", { network });
    }
  }
};
W3mWalletSendDetails.styles = styles$n;
__decorate$r([
  n()
], W3mWalletSendDetails.prototype, "receiverAddress", void 0);
__decorate$r([
  n({ type: Object })
], W3mWalletSendDetails.prototype, "caipNetwork", void 0);
__decorate$r([
  r()
], W3mWalletSendDetails.prototype, "params", void 0);
W3mWalletSendDetails = __decorate$r([
  customElement("w3m-wallet-send-details")
], W3mWalletSendDetails);
const styles$m = css`
  wui-avatar,
  wui-image {
    display: ruby;
    width: 32px;
    height: 32px;
    border-radius: ${({ borderRadius }) => borderRadius["20"]};
  }

  .sendButton {
    width: 70%;
    --local-width: 100% !important;
    --local-border-radius: ${({ borderRadius }) => borderRadius["4"]} !important;
  }

  .cancelButton {
    width: 30%;
    --local-width: 100% !important;
    --local-border-radius: ${({ borderRadius }) => borderRadius["4"]} !important;
  }
`;
var __decorate$q = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mWalletSendPreviewView = class W3mWalletSendPreviewView2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.token = SendController.state.token;
    this.sendTokenAmount = SendController.state.sendTokenAmount;
    this.receiverAddress = SendController.state.receiverAddress;
    this.receiverProfileName = SendController.state.receiverProfileName;
    this.receiverProfileImageUrl = SendController.state.receiverProfileImageUrl;
    this.caipNetwork = ChainController.state.activeCaipNetwork;
    this.loading = SendController.state.loading;
    this.params = RouterController.state.data?.send;
    this.unsubscribe.push(...[
      SendController.subscribe((val) => {
        this.token = val.token;
        this.sendTokenAmount = val.sendTokenAmount;
        this.receiverAddress = val.receiverAddress;
        this.receiverProfileName = val.receiverProfileName;
        this.receiverProfileImageUrl = val.receiverProfileImageUrl;
        this.loading = val.loading;
      }),
      ChainController.subscribeKey("activeCaipNetwork", (val) => this.caipNetwork = val)
    ]);
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    return T` <wui-flex flexDirection="column" .padding=${["0", "4", "4", "4"]}>
      <wui-flex gap="2" flexDirection="column" .padding=${["0", "2", "0", "2"]}>
        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-flex flexDirection="column" gap="01">
            <wui-text variant="sm-regular" color="secondary">Send</wui-text>
            ${this.sendValueTemplate()}
          </wui-flex>
          <wui-preview-item
            text="${this.sendTokenAmount ? UiHelperUtil.roundNumber(Number(this.sendTokenAmount), 6, 5) : "unknown"} ${this.token?.symbol}"
            .imageSrc=${this.token?.iconUrl}
          ></wui-preview-item>
        </wui-flex>
        <wui-flex>
          <wui-icon color="default" size="md" name="arrowBottom"></wui-icon>
        </wui-flex>
        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-text variant="sm-regular" color="secondary">To</wui-text>
          <wui-preview-item
            text="${this.receiverProfileName ? UiHelperUtil.getTruncateString({
      string: this.receiverProfileName,
      charsStart: 20,
      charsEnd: 0,
      truncate: "end"
    }) : UiHelperUtil.getTruncateString({
      string: this.receiverAddress ? this.receiverAddress : "",
      charsStart: 4,
      charsEnd: 4,
      truncate: "middle"
    })}"
            address=${this.receiverAddress ?? ""}
            .imageSrc=${this.receiverProfileImageUrl ?? void 0}
            .isAddress=${true}
          ></wui-preview-item>
        </wui-flex>
      </wui-flex>
      <wui-flex flexDirection="column" .padding=${["6", "0", "0", "0"]}>
        <w3m-wallet-send-details
          .caipNetwork=${this.caipNetwork}
          .receiverAddress=${this.receiverAddress}
        ></w3m-wallet-send-details>
        <wui-flex justifyContent="center" gap="1" .padding=${["3", "0", "0", "0"]}>
          <wui-icon size="sm" color="default" name="warningCircle"></wui-icon>
          <wui-text variant="sm-regular" color="secondary">Review transaction carefully</wui-text>
        </wui-flex>
        <wui-flex justifyContent="center" gap="3" .padding=${["4", "0", "0", "0"]}>
          <wui-button
            class="cancelButton"
            @click=${this.onCancelClick.bind(this)}
            size="lg"
            variant="neutral-secondary"
          >
            Cancel
          </wui-button>
          <wui-button
            class="sendButton"
            @click=${this.onSendClick.bind(this)}
            size="lg"
            variant="accent-primary"
            .loading=${this.loading}
          >
            Send
          </wui-button>
        </wui-flex>
      </wui-flex></wui-flex
    >`;
  }
  sendValueTemplate() {
    if (!this.params && this.token && this.sendTokenAmount) {
      const price = this.token.price;
      const totalValue = price * Number(this.sendTokenAmount);
      return T`<wui-text variant="md-regular" color="primary"
        >$${totalValue.toFixed(2)}</wui-text
      >`;
    }
    return null;
  }
  async onSendClick() {
    if (!this.sendTokenAmount || !this.receiverAddress) {
      SnackController.showError("Please enter a valid amount and receiver address");
      return;
    }
    try {
      await SendController.sendToken();
      if (this.params) {
        RouterController.reset("WalletSendConfirmed");
      } else {
        SnackController.showSuccess("Transaction started");
        RouterController.replace("Account");
      }
    } catch (error) {
      let errMessage = "Failed to send transaction";
      const isUserRejectedRequestError = error instanceof AppKitError && error.originalName === ErrorUtil$1.PROVIDER_RPC_ERROR_NAME.USER_REJECTED_REQUEST;
      const isSendTransactionError = error instanceof AppKitError && error.originalName === ErrorUtil$1.PROVIDER_RPC_ERROR_NAME.SEND_TRANSACTION_ERROR;
      if (isUserRejectedRequestError || isSendTransactionError) {
        errMessage = error.message;
      }
      EventsController.sendEvent({
        type: "track",
        event: isUserRejectedRequestError ? "SEND_REJECTED" : "SEND_ERROR",
        properties: SendController.getSdkEventProperties(error)
      });
      SnackController.showError(errMessage);
    }
  }
  onCancelClick() {
    RouterController.goBack();
  }
};
W3mWalletSendPreviewView.styles = styles$m;
__decorate$q([
  r()
], W3mWalletSendPreviewView.prototype, "token", void 0);
__decorate$q([
  r()
], W3mWalletSendPreviewView.prototype, "sendTokenAmount", void 0);
__decorate$q([
  r()
], W3mWalletSendPreviewView.prototype, "receiverAddress", void 0);
__decorate$q([
  r()
], W3mWalletSendPreviewView.prototype, "receiverProfileName", void 0);
__decorate$q([
  r()
], W3mWalletSendPreviewView.prototype, "receiverProfileImageUrl", void 0);
__decorate$q([
  r()
], W3mWalletSendPreviewView.prototype, "caipNetwork", void 0);
__decorate$q([
  r()
], W3mWalletSendPreviewView.prototype, "loading", void 0);
__decorate$q([
  r()
], W3mWalletSendPreviewView.prototype, "params", void 0);
W3mWalletSendPreviewView = __decorate$q([
  customElement("w3m-wallet-send-preview-view")
], W3mWalletSendPreviewView);
const styles$l = css`
  .icon-box {
    width: 64px;
    height: 64px;
    border-radius: 16px;
    background-color: ${({ spacing }) => spacing[16]};
    border: 8px solid ${({ tokens }) => tokens.theme.borderPrimary};
    border-radius: ${({ borderRadius }) => borderRadius.round};
  }
`;
var __decorate$p = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mSendConfirmedView = class W3mSendConfirmedView2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.unsubscribe.push(...[]);
  }
  render() {
    return T`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="4"
        .padding="${["1", "3", "4", "3"]}"
      >
        <wui-flex justifyContent="center" alignItems="center" class="icon-box">
          <wui-icon size="xxl" color="success" name="checkmark"></wui-icon>
        </wui-flex>

        <wui-text variant="h6-medium" color="primary">You successfully sent asset</wui-text>

        <wui-button
          fullWidth
          @click=${this.onCloseClick.bind(this)}
          size="lg"
          variant="neutral-secondary"
        >
          Close
        </wui-button>
      </wui-flex>
    `;
  }
  onCloseClick() {
    ModalController.close();
  }
};
W3mSendConfirmedView.styles = styles$l;
W3mSendConfirmedView = __decorate$p([
  customElement("w3m-send-confirmed-view")
], W3mSendConfirmedView);
const send = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get W3mSendConfirmedView() {
    return W3mSendConfirmedView;
  },
  get W3mSendSelectTokenView() {
    return W3mSendSelectTokenView;
  },
  get W3mWalletSendPreviewView() {
    return W3mWalletSendPreviewView;
  },
  get W3mWalletSendView() {
    return W3mWalletSendView;
  }
});
const styles$k = css`
  wui-compatible-network {
    margin-top: ${({ spacing }) => spacing["4"]};
    width: 100%;
  }

  wui-qr-code {
    width: unset !important;
    height: unset !important;
  }

  wui-icon {
    align-items: normal;
  }
`;
var __decorate$o = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mWalletReceiveView = class W3mWalletReceiveView2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.address = ChainController.getAccountData()?.address;
    this.profileName = ChainController.getAccountData()?.profileName;
    this.network = ChainController.state.activeCaipNetwork;
    this.unsubscribe.push(...[
      ChainController.subscribeChainProp("accountState", (val) => {
        if (val) {
          this.address = val.address;
          this.profileName = val.profileName;
        } else {
          SnackController.showError("Account not found");
        }
      })
    ], ChainController.subscribeKey("activeCaipNetwork", (val) => {
      if (val?.id) {
        this.network = val;
      }
    }));
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    if (!this.address) {
      throw new Error("w3m-wallet-receive-view: No account provided");
    }
    const networkImage = AssetUtil.getNetworkImage(this.network);
    return T` <wui-flex
      flexDirection="column"
      .padding=${["0", "4", "4", "4"]}
      alignItems="center"
    >
      <wui-chip-button
        data-testid="receive-address-copy-button"
        @click=${this.onCopyClick.bind(this)}
        text=${UiHelperUtil.getTruncateString({
      string: this.profileName || this.address || "",
      charsStart: this.profileName ? 18 : 4,
      charsEnd: this.profileName ? 0 : 4,
      truncate: this.profileName ? "end" : "middle"
    })}
        icon="copy"
        size="sm"
        imageSrc=${networkImage ? networkImage : ""}
        variant="gray"
      ></wui-chip-button>
      <wui-flex
        flexDirection="column"
        .padding=${["4", "0", "0", "0"]}
        alignItems="center"
        gap="4"
      >
        <wui-qr-code
          size=${232}
          theme=${ThemeController.state.themeMode}
          uri=${this.address}
          ?arenaClear=${true}
          color=${o(ThemeController.state.themeVariables["--apkt-qr-color"] ?? ThemeController.state.themeVariables["--w3m-qr-color"])}
          data-testid="wui-qr-code"
        ></wui-qr-code>
        <wui-text variant="lg-regular" color="primary" align="center">
          Copy your address or scan this QR code
        </wui-text>
        <wui-button @click=${this.onCopyClick.bind(this)} size="sm" variant="neutral-secondary">
          <wui-icon slot="iconLeft" size="sm" color="inherit" name="copy"></wui-icon>
          <wui-text variant="md-regular" color="inherit">Copy address</wui-text>
        </wui-button>
      </wui-flex>
      ${this.networkTemplate()}
    </wui-flex>`;
  }
  networkTemplate() {
    const requestedCaipNetworks = ChainController.getAllRequestedCaipNetworks();
    const isNetworkEnabledForSmartAccounts = ChainController.checkIfSmartAccountEnabled();
    const caipNetwork = ChainController.state.activeCaipNetwork;
    const namespaceNetworks = requestedCaipNetworks.filter((network) => network?.chainNamespace === caipNetwork?.chainNamespace);
    if (getPreferredAccountType(caipNetwork?.chainNamespace) === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT && isNetworkEnabledForSmartAccounts) {
      if (!caipNetwork) {
        return null;
      }
      return T`<wui-compatible-network
        @click=${this.onReceiveClick.bind(this)}
        text="Only receive assets on this network"
        .networkImages=${[AssetUtil.getNetworkImage(caipNetwork) ?? ""]}
      ></wui-compatible-network>`;
    }
    const slicedNetworks = namespaceNetworks?.filter((network) => network?.assets?.imageId)?.slice(0, 5);
    const imagesArray = slicedNetworks.map(AssetUtil.getNetworkImage).filter(Boolean);
    return T`<wui-compatible-network
      @click=${this.onReceiveClick.bind(this)}
      text="Only receive assets on these networks"
      .networkImages=${imagesArray}
    ></wui-compatible-network>`;
  }
  onReceiveClick() {
    RouterController.push("WalletCompatibleNetworks");
  }
  onCopyClick() {
    try {
      if (this.address) {
        CoreHelperUtil.copyToClopboard(this.address);
        SnackController.showSuccess("Address copied");
      }
    } catch {
      SnackController.showError("Failed to copy");
    }
  }
};
W3mWalletReceiveView.styles = styles$k;
__decorate$o([
  r()
], W3mWalletReceiveView.prototype, "address", void 0);
__decorate$o([
  r()
], W3mWalletReceiveView.prototype, "profileName", void 0);
__decorate$o([
  r()
], W3mWalletReceiveView.prototype, "network", void 0);
W3mWalletReceiveView = __decorate$o([
  customElement("w3m-wallet-receive-view")
], W3mWalletReceiveView);
const receive = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get W3mWalletReceiveView() {
    return W3mWalletReceiveView;
  }
});
const styles$j = css`
  :host > wui-grid {
    max-height: 360px;
    overflow: auto;
  }

  wui-flex {
    transition: opacity ${({ easings }) => easings["ease-out-power-1"]}
      ${({ durations }) => durations["md"]};
    will-change: opacity;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-flex.disabled {
    opacity: 0.3;
    pointer-events: none;
    user-select: none;
  }
`;
var __decorate$n = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mOnrampFiatSelectView = class W3mOnrampFiatSelectView2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.selectedCurrency = OnRampController.state.paymentCurrency;
    this.currencies = OnRampController.state.paymentCurrencies;
    this.currencyImages = AssetController.state.currencyImages;
    this.checked = OptionsStateController.state.isLegalCheckboxChecked;
    this.unsubscribe.push(...[
      OnRampController.subscribe((val) => {
        this.selectedCurrency = val.paymentCurrency;
        this.currencies = val.paymentCurrencies;
      }),
      AssetController.subscribeKey("currencyImages", (val) => this.currencyImages = val),
      OptionsStateController.subscribeKey("isLegalCheckboxChecked", (val) => {
        this.checked = val;
      })
    ]);
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    const { termsConditionsUrl, privacyPolicyUrl } = OptionsController.state;
    const legalCheckbox = OptionsController.state.features?.legalCheckbox;
    const legalUrl = termsConditionsUrl || privacyPolicyUrl;
    const showLegalCheckbox = Boolean(legalUrl) && Boolean(legalCheckbox);
    const disabled = showLegalCheckbox && !this.checked;
    return T`
      <w3m-legal-checkbox></w3m-legal-checkbox>
      <wui-flex
        flexDirection="column"
        .padding=${["0", "3", "3", "3"]}
        gap="2"
        class=${o(disabled ? "disabled" : void 0)}
      >
        ${this.currenciesTemplate(disabled)}
      </wui-flex>
    `;
  }
  currenciesTemplate(disabled = false) {
    return this.currencies.map((currency) => T`
        <wui-list-item
          imageSrc=${o(this.currencyImages?.[currency.id])}
          @click=${() => this.selectCurrency(currency)}
          variant="image"
          tabIdx=${o(disabled ? -1 : void 0)}
        >
          <wui-text variant="md-medium" color="primary">${currency.id}</wui-text>
        </wui-list-item>
      `);
  }
  selectCurrency(currency) {
    if (!currency) {
      return;
    }
    OnRampController.setPaymentCurrency(currency);
    ModalController.close();
  }
};
W3mOnrampFiatSelectView.styles = styles$j;
__decorate$n([
  r()
], W3mOnrampFiatSelectView.prototype, "selectedCurrency", void 0);
__decorate$n([
  r()
], W3mOnrampFiatSelectView.prototype, "currencies", void 0);
__decorate$n([
  r()
], W3mOnrampFiatSelectView.prototype, "currencyImages", void 0);
__decorate$n([
  r()
], W3mOnrampFiatSelectView.prototype, "checked", void 0);
W3mOnrampFiatSelectView = __decorate$n([
  customElement("w3m-onramp-fiat-select-view")
], W3mOnrampFiatSelectView);
const styles$i = css`
  button {
    padding: ${({ spacing }) => spacing["3"]};
    border-radius: ${({ borderRadius }) => borderRadius["4"]};
    border: none;
    outline: none;
    background-color: ${({ tokens }) => tokens.core.glass010};
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: ${({ spacing }) => spacing["3"]};
    transition: background-color ${({ easings }) => easings["ease-out-power-1"]}
      ${({ durations }) => durations["md"]};
    will-change: background-color;
    cursor: pointer;
  }

  button:hover {
    background-color: ${({ tokens }) => tokens.theme.foregroundPrimary};
  }

  .provider-image {
    width: ${({ spacing }) => spacing["10"]};
    min-width: ${({ spacing }) => spacing["10"]};
    height: ${({ spacing }) => spacing["10"]};
    border-radius: calc(
      ${({ borderRadius }) => borderRadius["4"]} - calc(${({ spacing }) => spacing["3"]} / 2)
    );
    position: relative;
    overflow: hidden;
  }

  .network-icon {
    width: ${({ spacing }) => spacing["3"]};
    height: ${({ spacing }) => spacing["3"]};
    border-radius: calc(${({ spacing }) => spacing["3"]} / 2);
    overflow: hidden;
    box-shadow:
      0 0 0 3px ${({ tokens }) => tokens.theme.foregroundPrimary},
      0 0 0 3px ${({ tokens }) => tokens.theme.backgroundPrimary};
    transition: box-shadow ${({ easings }) => easings["ease-out-power-1"]}
      ${({ durations }) => durations["md"]};
    will-change: box-shadow;
  }

  button:hover .network-icon {
    box-shadow:
      0 0 0 3px ${({ tokens }) => tokens.core.glass010},
      0 0 0 3px ${({ tokens }) => tokens.theme.backgroundPrimary};
  }
`;
var __decorate$m = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mOnRampProviderItem = class W3mOnRampProviderItem2 extends i {
  constructor() {
    super(...arguments);
    this.disabled = false;
    this.color = "inherit";
    this.label = "";
    this.feeRange = "";
    this.loading = false;
    this.onClick = null;
  }
  render() {
    return T`
      <button ?disabled=${this.disabled} @click=${this.onClick} ontouchstart>
        <wui-visual name=${o(this.name)} class="provider-image"></wui-visual>
        <wui-flex flexDirection="column" gap="01">
          <wui-text variant="md-regular" color="primary">${this.label}</wui-text>
          <wui-flex alignItems="center" justifyContent="flex-start" gap="4">
            <wui-text variant="sm-medium" color="primary">
              <wui-text variant="sm-regular" color="secondary">Fees</wui-text>
              ${this.feeRange}
            </wui-text>
            <wui-flex gap="2">
              <wui-icon name="bank" size="sm" color="default"></wui-icon>
              <wui-icon name="card" size="sm" color="default"></wui-icon>
            </wui-flex>
            ${this.networksTemplate()}
          </wui-flex>
        </wui-flex>
        ${this.loading ? T`<wui-loading-spinner color="secondary" size="md"></wui-loading-spinner>` : T`<wui-icon name="chevronRight" color="default" size="sm"></wui-icon>`}
      </button>
    `;
  }
  networksTemplate() {
    const requestedCaipNetworks = ChainController.getAllRequestedCaipNetworks();
    const slicedNetworks = requestedCaipNetworks?.filter((network) => network?.assets?.imageId)?.slice(0, 5);
    return T`
      <wui-flex class="networks">
        ${slicedNetworks?.map((network) => T`
            <wui-flex class="network-icon">
              <wui-image src=${o(AssetUtil.getNetworkImage(network))}></wui-image>
            </wui-flex>
          `)}
      </wui-flex>
    `;
  }
};
W3mOnRampProviderItem.styles = [styles$i];
__decorate$m([
  n({ type: Boolean })
], W3mOnRampProviderItem.prototype, "disabled", void 0);
__decorate$m([
  n()
], W3mOnRampProviderItem.prototype, "color", void 0);
__decorate$m([
  n()
], W3mOnRampProviderItem.prototype, "name", void 0);
__decorate$m([
  n()
], W3mOnRampProviderItem.prototype, "label", void 0);
__decorate$m([
  n()
], W3mOnRampProviderItem.prototype, "feeRange", void 0);
__decorate$m([
  n({ type: Boolean })
], W3mOnRampProviderItem.prototype, "loading", void 0);
__decorate$m([
  n()
], W3mOnRampProviderItem.prototype, "onClick", void 0);
W3mOnRampProviderItem = __decorate$m([
  customElement("w3m-onramp-provider-item")
], W3mOnRampProviderItem);
var __decorate$l = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mOnRampProvidersView = class W3mOnRampProvidersView2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.providers = OnRampController.state.providers;
    this.unsubscribe.push(...[
      OnRampController.subscribeKey("providers", (val) => {
        this.providers = val;
      })
    ]);
  }
  render() {
    return T`
      <wui-flex flexDirection="column" .padding=${["0", "3", "3", "3"]} gap="2">
        ${this.onRampProvidersTemplate()}
      </wui-flex>
    `;
  }
  onRampProvidersTemplate() {
    return this.providers.filter((provider) => provider.supportedChains.includes(ChainController.state.activeChain ?? "eip155")).map((provider) => T`
          <w3m-onramp-provider-item
            label=${provider.label}
            name=${provider.name}
            feeRange=${provider.feeRange}
            @click=${() => {
      this.onClickProvider(provider);
    }}
            ?disabled=${!provider.url}
            data-testid=${`onramp-provider-${provider.name}`}
          ></w3m-onramp-provider-item>
        `);
  }
  onClickProvider(provider) {
    OnRampController.setSelectedProvider(provider);
    RouterController.push("BuyInProgress");
    CoreHelperUtil.openHref(OnRampController.state.selectedProvider?.url || provider.url, "popupWindow", "width=600,height=800,scrollbars=yes");
    EventsController.sendEvent({
      type: "track",
      event: "SELECT_BUY_PROVIDER",
      properties: {
        provider: provider.name,
        isSmartAccount: getPreferredAccountType(ChainController.state.activeChain) === W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT
      }
    });
  }
};
__decorate$l([
  r()
], W3mOnRampProvidersView.prototype, "providers", void 0);
W3mOnRampProvidersView = __decorate$l([
  customElement("w3m-onramp-providers-view")
], W3mOnRampProvidersView);
const styles$h = css`
  :host > wui-grid {
    max-height: 360px;
    overflow: auto;
  }

  wui-flex {
    transition: opacity ${({ easings }) => easings["ease-out-power-1"]}
      ${({ durations }) => durations["md"]};
    will-change: opacity;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-flex.disabled {
    opacity: 0.3;
    pointer-events: none;
    user-select: none;
  }
`;
var __decorate$k = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mOnrampTokensView = class W3mOnrampTokensView2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.selectedCurrency = OnRampController.state.purchaseCurrencies;
    this.tokens = OnRampController.state.purchaseCurrencies;
    this.tokenImages = AssetController.state.tokenImages;
    this.checked = OptionsStateController.state.isLegalCheckboxChecked;
    this.unsubscribe.push(...[
      OnRampController.subscribe((val) => {
        this.selectedCurrency = val.purchaseCurrencies;
        this.tokens = val.purchaseCurrencies;
      }),
      AssetController.subscribeKey("tokenImages", (val) => this.tokenImages = val),
      OptionsStateController.subscribeKey("isLegalCheckboxChecked", (val) => {
        this.checked = val;
      })
    ]);
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    const { termsConditionsUrl, privacyPolicyUrl } = OptionsController.state;
    const legalCheckbox = OptionsController.state.features?.legalCheckbox;
    const legalUrl = termsConditionsUrl || privacyPolicyUrl;
    const showLegalCheckbox = Boolean(legalUrl) && Boolean(legalCheckbox);
    const disabled = showLegalCheckbox && !this.checked;
    return T`
      <w3m-legal-checkbox></w3m-legal-checkbox>
      <wui-flex
        flexDirection="column"
        .padding=${["0", "3", "3", "3"]}
        gap="2"
        class=${o(disabled ? "disabled" : void 0)}
      >
        ${this.currenciesTemplate(disabled)}
      </wui-flex>
    `;
  }
  currenciesTemplate(disabled = false) {
    return this.tokens.map((token) => T`
        <wui-list-item
          imageSrc=${o(this.tokenImages?.[token.symbol])}
          @click=${() => this.selectToken(token)}
          variant="image"
          tabIdx=${o(disabled ? -1 : void 0)}
        >
          <wui-flex gap="1" alignItems="center">
            <wui-text variant="md-medium" color="primary">${token.name}</wui-text>
            <wui-text variant="sm-regular" color="secondary">${token.symbol}</wui-text>
          </wui-flex>
        </wui-list-item>
      `);
  }
  selectToken(currency) {
    if (!currency) {
      return;
    }
    OnRampController.setPurchaseCurrency(currency);
    ModalController.close();
  }
};
W3mOnrampTokensView.styles = styles$h;
__decorate$k([
  r()
], W3mOnrampTokensView.prototype, "selectedCurrency", void 0);
__decorate$k([
  r()
], W3mOnrampTokensView.prototype, "tokens", void 0);
__decorate$k([
  r()
], W3mOnrampTokensView.prototype, "tokenImages", void 0);
__decorate$k([
  r()
], W3mOnrampTokensView.prototype, "checked", void 0);
W3mOnrampTokensView = __decorate$k([
  customElement("w3m-onramp-token-select-view")
], W3mOnrampTokensView);
const styles$g = css`
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-loading-thumbnail {
    position: absolute;
  }

  wui-visual {
    border-radius: calc(
      ${({ borderRadius }) => borderRadius["1"]} * 9 - ${({ borderRadius }) => borderRadius["3"]}
    );
    position: relative;
    overflow: hidden;
  }

  wui-icon-box {
    position: absolute;
    right: calc(${({ spacing }) => spacing["1"]} * -1);
    bottom: calc(${({ spacing }) => spacing["1"]} * -1);
    opacity: 0;
    transform: scale(0.5);
    transition:
      opacity ${({ durations }) => durations["lg"]} ${({ easings }) => easings["ease-out-power-2"]},
      transform ${({ durations }) => durations["lg"]}
        ${({ easings }) => easings["ease-out-power-2"]};
    will-change: opacity, transform;
  }

  wui-text[align='center'] {
    width: 100%;
    padding: 0px ${({ spacing }) => spacing["4"]};
  }

  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }

  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms ${({ easings }) => easings["ease-out-power-2"]} both;
  }

  [data-retry='false'] wui-link {
    display: none;
  }

  [data-retry='true'] wui-link {
    display: block;
    opacity: 1;
  }

  wui-link {
    padding: ${({ spacing }) => spacing["01"]} ${({ spacing }) => spacing["2"]};
  }
`;
var __decorate$j = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mBuyInProgressView = class W3mBuyInProgressView2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.selectedOnRampProvider = OnRampController.state.selectedProvider;
    this.uri = ConnectionController.state.wcUri;
    this.ready = false;
    this.showRetry = false;
    this.buffering = false;
    this.error = false;
    this.isMobile = false;
    this.onRetry = void 0;
    this.unsubscribe.push(...[
      OnRampController.subscribeKey("selectedProvider", (val) => {
        this.selectedOnRampProvider = val;
      })
    ]);
  }
  disconnectedCallback() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
  render() {
    let label = "Continue in external window";
    if (this.error) {
      label = "Buy failed";
    } else if (this.selectedOnRampProvider) {
      label = `Buy in ${this.selectedOnRampProvider?.label}`;
    }
    const subLabel = this.error ? "Buy can be declined from your side or due to and error on the provider app" : `We’ll notify you once your Buy is processed`;
    return T`
      <wui-flex
        data-error=${o(this.error)}
        data-retry=${this.showRetry}
        flexDirection="column"
        alignItems="center"
        .padding=${["10", "5", "5", "5"]}
        gap="5"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-visual
            name=${o(this.selectedOnRampProvider?.name)}
            size="lg"
            class="provider-image"
          >
          </wui-visual>

          ${this.error ? null : this.loaderTemplate()}

          <wui-icon-box
            color="error"
            icon="close"
            size="sm"
            border
            borderColor="wui-color-bg-125"
          ></wui-icon-box>
        </wui-flex>

        <wui-flex
          flexDirection="column"
          alignItems="center"
          gap="2"
          .padding=${["4", "0", "0", "0"]}
        >
          <wui-text variant="md-medium" color=${this.error ? "error" : "primary"}>
            ${label}
          </wui-text>
          <wui-text align="center" variant="sm-medium" color="secondary">${subLabel}</wui-text>
        </wui-flex>

        ${this.error ? this.tryAgainTemplate() : null}
      </wui-flex>

      <wui-flex .padding=${["0", "5", "5", "5"]} justifyContent="center">
        <wui-link @click=${this.onCopyUri} color="secondary">
          <wui-icon size="sm" color="default" slot="iconLeft" name="copy"></wui-icon>
          Copy link
        </wui-link>
      </wui-flex>
    `;
  }
  onTryAgain() {
    if (!this.selectedOnRampProvider) {
      return;
    }
    this.error = false;
    CoreHelperUtil.openHref(this.selectedOnRampProvider.url, "popupWindow", "width=600,height=800,scrollbars=yes");
  }
  tryAgainTemplate() {
    if (!this.selectedOnRampProvider?.url) {
      return null;
    }
    return T`<wui-button size="md" variant="accent" @click=${this.onTryAgain.bind(this)}>
      <wui-icon color="inherit" slot="iconLeft" name="refresh"></wui-icon>
      Try again
    </wui-button>`;
  }
  loaderTemplate() {
    const borderRadiusMaster = ThemeController.state.themeVariables["--w3m-border-radius-master"];
    const radius = borderRadiusMaster ? parseInt(borderRadiusMaster.replace("px", ""), 10) : 4;
    return T`<wui-loading-thumbnail radius=${radius * 9}></wui-loading-thumbnail>`;
  }
  onCopyUri() {
    if (!this.selectedOnRampProvider?.url) {
      SnackController.showError("No link found");
      RouterController.goBack();
      return;
    }
    try {
      CoreHelperUtil.copyToClopboard(this.selectedOnRampProvider.url);
      SnackController.showSuccess("Link copied");
    } catch {
      SnackController.showError("Failed to copy");
    }
  }
};
W3mBuyInProgressView.styles = styles$g;
__decorate$j([
  r()
], W3mBuyInProgressView.prototype, "intervalId", void 0);
__decorate$j([
  r()
], W3mBuyInProgressView.prototype, "selectedOnRampProvider", void 0);
__decorate$j([
  r()
], W3mBuyInProgressView.prototype, "uri", void 0);
__decorate$j([
  r()
], W3mBuyInProgressView.prototype, "ready", void 0);
__decorate$j([
  r()
], W3mBuyInProgressView.prototype, "showRetry", void 0);
__decorate$j([
  r()
], W3mBuyInProgressView.prototype, "buffering", void 0);
__decorate$j([
  r()
], W3mBuyInProgressView.prototype, "error", void 0);
__decorate$j([
  n({ type: Boolean })
], W3mBuyInProgressView.prototype, "isMobile", void 0);
__decorate$j([
  n()
], W3mBuyInProgressView.prototype, "onRetry", void 0);
W3mBuyInProgressView = __decorate$j([
  customElement("w3m-buy-in-progress-view")
], W3mBuyInProgressView);
var __decorate$i = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mWhatIsABuyView = class W3mWhatIsABuyView2 extends i {
  render() {
    return T`
      <wui-flex
        flexDirection="column"
        .padding=${["6", "10", "5", "10"]}
        alignItems="center"
        gap="5"
      >
        <wui-visual name="onrampCard"></wui-visual>
        <wui-flex flexDirection="column" gap="2" alignItems="center">
          <wui-text align="center" variant="md-medium" color="primary">
            Quickly and easily buy digital assets!
          </wui-text>
          <wui-text align="center" variant="sm-regular" color="secondary">
            Simply select your preferred onramp provider and add digital assets to your account
            using your credit card or bank transfer
          </wui-text>
        </wui-flex>
        <wui-button @click=${RouterController.goBack}>
          <wui-icon size="sm" color="inherit" name="add" slot="iconLeft"></wui-icon>
          Buy
        </wui-button>
      </wui-flex>
    `;
  }
};
W3mWhatIsABuyView = __decorate$i([
  customElement("w3m-what-is-a-buy-view")
], W3mWhatIsABuyView);
const styles$f = css`
  :host {
    width: 100%;
  }

  wui-loading-spinner {
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
  }

  .currency-container {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: ${({ spacing }) => spacing["2"]};
    height: 40px;
    padding: ${({ spacing }) => spacing["2"]} ${({ spacing }) => spacing["2"]}
      ${({ spacing }) => spacing["2"]} ${({ spacing }) => spacing["2"]};
    min-width: 95px;
    border-radius: ${({ borderRadius }) => borderRadius["round"]};
    border: 1px solid ${({ tokens }) => tokens.theme.foregroundPrimary};
    background: ${({ tokens }) => tokens.theme.foregroundPrimary};
    cursor: pointer;
  }

  .currency-container > wui-image {
    height: 24px;
    width: 24px;
    border-radius: 50%;
  }
`;
var __decorate$h = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mInputCurrency = class W3mInputCurrency2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.type = "Token";
    this.value = 0;
    this.currencies = [];
    this.selectedCurrency = this.currencies?.[0];
    this.currencyImages = AssetController.state.currencyImages;
    this.tokenImages = AssetController.state.tokenImages;
    this.unsubscribe.push(OnRampController.subscribeKey("purchaseCurrency", (val) => {
      if (!val || this.type === "Fiat") {
        return;
      }
      this.selectedCurrency = this.formatPurchaseCurrency(val);
    }), OnRampController.subscribeKey("paymentCurrency", (val) => {
      if (!val || this.type === "Token") {
        return;
      }
      this.selectedCurrency = this.formatPaymentCurrency(val);
    }), OnRampController.subscribe((val) => {
      if (this.type === "Fiat") {
        this.currencies = val.purchaseCurrencies.map(this.formatPurchaseCurrency);
      } else {
        this.currencies = val.paymentCurrencies.map(this.formatPaymentCurrency);
      }
    }), AssetController.subscribe((val) => {
      this.currencyImages = { ...val.currencyImages };
      this.tokenImages = { ...val.tokenImages };
    }));
  }
  firstUpdated() {
    OnRampController.getAvailableCurrencies();
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    const symbol = this.selectedCurrency?.symbol || "";
    const image = this.currencyImages[symbol] || this.tokenImages[symbol];
    return T`<wui-input-text type="number" size="lg" value=${this.value}>
      ${this.selectedCurrency ? T` <wui-flex
            class="currency-container"
            justifyContent="space-between"
            alignItems="center"
            gap="1"
            @click=${() => ModalController.open({ view: `OnRamp${this.type}Select` })}
          >
            <wui-image src=${o(image)}></wui-image>
            <wui-text color="primary">${this.selectedCurrency.symbol}</wui-text>
          </wui-flex>` : T`<wui-loading-spinner></wui-loading-spinner>`}
    </wui-input-text>`;
  }
  formatPaymentCurrency(currency) {
    return {
      name: currency.id,
      symbol: currency.id
    };
  }
  formatPurchaseCurrency(currency) {
    return {
      name: currency.name,
      symbol: currency.symbol
    };
  }
};
W3mInputCurrency.styles = styles$f;
__decorate$h([
  n({ type: String })
], W3mInputCurrency.prototype, "type", void 0);
__decorate$h([
  n({ type: Number })
], W3mInputCurrency.prototype, "value", void 0);
__decorate$h([
  r()
], W3mInputCurrency.prototype, "currencies", void 0);
__decorate$h([
  r()
], W3mInputCurrency.prototype, "selectedCurrency", void 0);
__decorate$h([
  r()
], W3mInputCurrency.prototype, "currencyImages", void 0);
__decorate$h([
  r()
], W3mInputCurrency.prototype, "tokenImages", void 0);
W3mInputCurrency = __decorate$h([
  customElement("w3m-onramp-input")
], W3mInputCurrency);
const styles$e = css`
  :host > wui-flex {
    width: 100%;
    max-width: 360px;
  }

  :host > wui-flex > wui-flex {
    border-radius: ${({ borderRadius }) => borderRadius["8"]};
    width: 100%;
  }

  .amounts-container {
    width: 100%;
  }
`;
var __decorate$g = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
const PAYMENT_CURRENCY_SYMBOLS = {
  USD: "$",
  EUR: "€",
  GBP: "£"
};
const BUY_PRESET_AMOUNTS = [100, 250, 500, 1e3];
let W3mOnrampWidget = class W3mOnrampWidget2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.disabled = false;
    this.caipAddress = ChainController.state.activeCaipAddress;
    this.loading = ModalController.state.loading;
    this.paymentCurrency = OnRampController.state.paymentCurrency;
    this.paymentAmount = OnRampController.state.paymentAmount;
    this.purchaseAmount = OnRampController.state.purchaseAmount;
    this.quoteLoading = OnRampController.state.quotesLoading;
    this.unsubscribe.push(...[
      ChainController.subscribeKey("activeCaipAddress", (val) => this.caipAddress = val),
      ModalController.subscribeKey("loading", (val) => {
        this.loading = val;
      }),
      OnRampController.subscribe((val) => {
        this.paymentCurrency = val.paymentCurrency;
        this.paymentAmount = val.paymentAmount;
        this.purchaseAmount = val.purchaseAmount;
        this.quoteLoading = val.quotesLoading;
      })
    ]);
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    return T`
      <wui-flex flexDirection="column" justifyContent="center" alignItems="center">
        <wui-flex flexDirection="column" alignItems="center" gap="2">
          <w3m-onramp-input
            type="Fiat"
            @inputChange=${this.onPaymentAmountChange.bind(this)}
            .value=${this.paymentAmount || 0}
          ></w3m-onramp-input>
          <w3m-onramp-input
            type="Token"
            .value=${this.purchaseAmount || 0}
            .loading=${this.quoteLoading}
          ></w3m-onramp-input>
          <wui-flex justifyContent="space-evenly" class="amounts-container" gap="2">
            ${BUY_PRESET_AMOUNTS.map((amount) => T`<wui-button
                  variant=${this.paymentAmount === amount ? "accent-secondary" : "neutral-secondary"}
                  size="md"
                  textVariant="md-medium"
                  fullWidth
                  @click=${() => this.selectPresetAmount(amount)}
                  >${`${PAYMENT_CURRENCY_SYMBOLS[this.paymentCurrency?.id || "USD"]} ${amount}`}</wui-button
                >`)}
          </wui-flex>
          ${this.templateButton()}
        </wui-flex>
      </wui-flex>
    `;
  }
  templateButton() {
    return this.caipAddress ? T`<wui-button
          @click=${this.getQuotes.bind(this)}
          variant="accent-primary"
          fullWidth
          size="lg"
          borderRadius="xs"
        >
          Get quotes
        </wui-button>` : T`<wui-button
          @click=${this.openModal.bind(this)}
          variant="accent"
          fullWidth
          size="lg"
          borderRadius="xs"
        >
          Connect wallet
        </wui-button>`;
  }
  getQuotes() {
    if (!this.loading) {
      ModalController.open({ view: "OnRampProviders" });
    }
  }
  openModal() {
    ModalController.open({ view: "Connect" });
  }
  async onPaymentAmountChange(event) {
    OnRampController.setPaymentAmount(Number(event.detail));
    await OnRampController.getQuote();
  }
  async selectPresetAmount(amount) {
    OnRampController.setPaymentAmount(amount);
    await OnRampController.getQuote();
  }
};
W3mOnrampWidget.styles = styles$e;
__decorate$g([
  n({ type: Boolean })
], W3mOnrampWidget.prototype, "disabled", void 0);
__decorate$g([
  r()
], W3mOnrampWidget.prototype, "caipAddress", void 0);
__decorate$g([
  r()
], W3mOnrampWidget.prototype, "loading", void 0);
__decorate$g([
  r()
], W3mOnrampWidget.prototype, "paymentCurrency", void 0);
__decorate$g([
  r()
], W3mOnrampWidget.prototype, "paymentAmount", void 0);
__decorate$g([
  r()
], W3mOnrampWidget.prototype, "purchaseAmount", void 0);
__decorate$g([
  r()
], W3mOnrampWidget.prototype, "quoteLoading", void 0);
W3mOnrampWidget = __decorate$g([
  customElement("w3m-onramp-widget")
], W3mOnrampWidget);
const onramp = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get W3mBuyInProgressView() {
    return W3mBuyInProgressView;
  },
  get W3mOnRampProvidersView() {
    return W3mOnRampProvidersView;
  },
  get W3mOnrampFiatSelectView() {
    return W3mOnrampFiatSelectView;
  },
  get W3mOnrampTokensView() {
    return W3mOnrampTokensView;
  },
  get W3mOnrampWidget() {
    return W3mOnrampWidget;
  },
  get W3mWhatIsABuyView() {
    return W3mWhatIsABuyView;
  }
});
var __decorate$f = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mFundInput = class W3mFundInput2 extends i {
  constructor() {
    super(...arguments);
    this.maxDecimals = void 0;
    this.maxIntegers = void 0;
  }
  render() {
    return T`
      <wui-flex alignItems="center" gap="1">
        <wui-input-amount
          widthVariant="fit"
          fontSize="h2"
          .maxDecimals=${o(this.maxDecimals)}
          .maxIntegers=${o(this.maxIntegers)}
          .value=${this.amount ? String(this.amount) : ""}
        ></wui-input-amount>
        <wui-text variant="md-regular" color="secondary">USD</wui-text>
      </wui-flex>
    `;
  }
};
__decorate$f([
  n({ type: Number })
], W3mFundInput.prototype, "amount", void 0);
__decorate$f([
  n({ type: Number })
], W3mFundInput.prototype, "maxDecimals", void 0);
__decorate$f([
  n({ type: Number })
], W3mFundInput.prototype, "maxIntegers", void 0);
W3mFundInput = __decorate$f([
  customElement("w3m-fund-input")
], W3mFundInput);
const styles$d = css`
  .amount-input-container {
    border-radius: ${({ borderRadius }) => borderRadius["6"]};
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    background-color: ${({ tokens }) => tokens.theme.foregroundPrimary};
    padding: ${({ spacing }) => spacing[1]};
  }

  .container {
    border-radius: 30px;
  }
`;
var __decorate$e = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
const PRESET_AMOUNTS = [10, 50, 100];
const MAX_DECIMALS = 6;
const MAX_INTEGERS = 10;
let W3mDepositFromExchangeView = class W3mDepositFromExchangeView2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.network = ChainController.state.activeCaipNetwork;
    this.exchanges = ExchangeController.state.exchanges;
    this.isLoading = ExchangeController.state.isLoading;
    this.amount = ExchangeController.state.amount;
    this.tokenAmount = ExchangeController.state.tokenAmount;
    this.priceLoading = ExchangeController.state.priceLoading;
    this.isPaymentInProgress = ExchangeController.state.isPaymentInProgress;
    this.currentPayment = ExchangeController.state.currentPayment;
    this.paymentId = ExchangeController.state.paymentId;
    this.paymentAsset = ExchangeController.state.paymentAsset;
    this.unsubscribe.push(ChainController.subscribeKey("activeCaipNetwork", (val) => {
      this.network = val;
      this.setDefaultPaymentAsset();
    }), ExchangeController.subscribe((exchangeState) => {
      this.exchanges = exchangeState.exchanges;
      this.isLoading = exchangeState.isLoading;
      this.amount = exchangeState.amount;
      this.tokenAmount = exchangeState.tokenAmount;
      this.priceLoading = exchangeState.priceLoading;
      this.paymentId = exchangeState.paymentId;
      this.isPaymentInProgress = exchangeState.isPaymentInProgress;
      this.currentPayment = exchangeState.currentPayment;
      this.paymentAsset = exchangeState.paymentAsset;
      const shouldHandlePaymentInProgress = exchangeState.isPaymentInProgress && exchangeState.currentPayment?.exchangeId && exchangeState.currentPayment?.sessionId && exchangeState.paymentId;
      if (shouldHandlePaymentInProgress) {
        this.handlePaymentInProgress();
      }
    }));
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
    const isInProgress = ExchangeController.state.isPaymentInProgress;
    if (!isInProgress) {
      ExchangeController.reset();
    }
  }
  async firstUpdated() {
    await this.getPaymentAssets();
    if (!this.paymentAsset) {
      await this.setDefaultPaymentAsset();
    }
    ExchangeController.setAmount(PRESET_AMOUNTS[0]);
    await ExchangeController.fetchExchanges();
  }
  render() {
    return T`
      <wui-flex flexDirection="column" class="container">
        ${this.amountInputTemplate()} ${this.exchangesTemplate()}
      </wui-flex>
    `;
  }
  exchangesLoadingTemplate() {
    return Array.from({ length: 2 }).map(() => T`<wui-shimmer width="100%" height="65px" borderRadius="xxs"></wui-shimmer>`);
  }
  _exchangesTemplate() {
    return this.exchanges.length > 0 ? this.exchanges.map((exchange) => T`<wui-list-item
              @click=${() => this.onExchangeClick(exchange)}
              chevron
              variant="image"
              imageSrc=${exchange.imageUrl}
              ?loading=${this.isLoading}
            >
              <wui-text variant="md-regular" color="primary">
                Deposit from ${exchange.name}
              </wui-text>
            </wui-list-item>`) : T`<wui-flex flexDirection="column" alignItems="center" gap="4" padding="4">
          <wui-text variant="lg-medium" align="center" color="primary">
            No exchanges support this asset on this network
          </wui-text>
        </wui-flex>`;
  }
  exchangesTemplate() {
    return T`<wui-flex
      flexDirection="column"
      gap="2"
      .padding=${["3", "3", "3", "3"]}
      class="exchanges-container"
    >
      ${this.isLoading ? this.exchangesLoadingTemplate() : this._exchangesTemplate()}
    </wui-flex>`;
  }
  amountInputTemplate() {
    return T`
      <wui-flex
        flexDirection="column"
        .padding=${["0", "3", "3", "3"]}
        class="amount-input-container"
      >
        <wui-flex
          justifyContent="space-between"
          alignItems="center"
          .margin=${["0", "0", "6", "0"]}
        >
          <wui-text variant="md-medium" color="secondary">Asset</wui-text>
          <wui-token-button
            data-testid="deposit-from-exchange-asset-button"
            flexDirection="row-reverse"
            text=${this.paymentAsset?.metadata.symbol || ""}
            imageSrc=${this.paymentAsset?.metadata.iconUrl || ""}
            @click=${() => RouterController.push("PayWithExchangeSelectAsset")}
            size="lg"
            .chainImageSrc=${o(AssetUtil.getNetworkImage(this.network))}
          >
          </wui-token-button>
        </wui-flex>
        <wui-flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          .margin=${["0", "0", "4", "0"]}
        >
          <w3m-fund-input
            @inputChange=${this.onAmountChange.bind(this)}
            .amount=${this.amount}
            .maxDecimals=${MAX_DECIMALS}
            .maxIntegers=${MAX_INTEGERS}
          >
          </w3m-fund-input>
          ${this.tokenAmountTemplate()}
        </wui-flex>
        <wui-flex justifyContent="center" gap="2">
          ${PRESET_AMOUNTS.map((amount) => T`<wui-chip-button
                @click=${() => ExchangeController.setAmount(amount)}
                type="neutral"
                size="lg"
                text=${`$${amount}`}
              ></wui-chip-button>`)}
        </wui-flex>
      </wui-flex>
    `;
  }
  tokenAmountTemplate() {
    if (this.priceLoading) {
      return T`<wui-shimmer
        width="65px"
        height="20px"
        borderRadius="xxs"
        variant="light"
      ></wui-shimmer>`;
    }
    return T`
      <wui-text variant="md-regular" color="secondary">
        ${this.tokenAmount.toFixed(4)} ${this.paymentAsset?.metadata.symbol}
      </wui-text>
    `;
  }
  async onExchangeClick(exchange) {
    if (!this.amount) {
      SnackController.showError("Please enter an amount");
      return;
    }
    await ExchangeController.handlePayWithExchange(exchange.id);
  }
  handlePaymentInProgress() {
    const namespace = ChainController.state.activeChain;
    const { redirectView = "Account" } = RouterController.state.data ?? {};
    if (this.isPaymentInProgress && this.currentPayment?.exchangeId && this.currentPayment?.sessionId && this.paymentId) {
      ExchangeController.waitUntilComplete({
        exchangeId: this.currentPayment.exchangeId,
        sessionId: this.currentPayment.sessionId,
        paymentId: this.paymentId
      }).then((status) => {
        if (status.status === "SUCCESS") {
          SnackController.showSuccess("Deposit completed");
          ExchangeController.reset();
          if (namespace) {
            ChainController.fetchTokenBalance();
            ConnectionController.updateBalance(namespace);
          }
          RouterController.replace("Transactions");
        } else if (status.status === "FAILED") {
          SnackController.showError("Deposit failed");
        }
      });
      SnackController.showLoading("Deposit in progress...");
      RouterController.replace(redirectView);
    }
  }
  onAmountChange({ detail }) {
    ExchangeController.setAmount(detail ? Number(detail) : null);
  }
  async getPaymentAssets() {
    if (this.network) {
      await ExchangeController.getAssetsForNetwork(this.network.caipNetworkId);
    }
  }
  async setDefaultPaymentAsset() {
    if (this.network) {
      const paymentAssets = await ExchangeController.getAssetsForNetwork(this.network.caipNetworkId);
      if (paymentAssets[0]) {
        ExchangeController.setPaymentAsset(paymentAssets[0]);
      }
    }
  }
};
W3mDepositFromExchangeView.styles = styles$d;
__decorate$e([
  r()
], W3mDepositFromExchangeView.prototype, "network", void 0);
__decorate$e([
  r()
], W3mDepositFromExchangeView.prototype, "exchanges", void 0);
__decorate$e([
  r()
], W3mDepositFromExchangeView.prototype, "isLoading", void 0);
__decorate$e([
  r()
], W3mDepositFromExchangeView.prototype, "amount", void 0);
__decorate$e([
  r()
], W3mDepositFromExchangeView.prototype, "tokenAmount", void 0);
__decorate$e([
  r()
], W3mDepositFromExchangeView.prototype, "priceLoading", void 0);
__decorate$e([
  r()
], W3mDepositFromExchangeView.prototype, "isPaymentInProgress", void 0);
__decorate$e([
  r()
], W3mDepositFromExchangeView.prototype, "currentPayment", void 0);
__decorate$e([
  r()
], W3mDepositFromExchangeView.prototype, "paymentId", void 0);
__decorate$e([
  r()
], W3mDepositFromExchangeView.prototype, "paymentAsset", void 0);
W3mDepositFromExchangeView = __decorate$e([
  customElement("w3m-deposit-from-exchange-view")
], W3mDepositFromExchangeView);
const styles$c = css`
  .contentContainer {
    height: 440px;
    overflow: scroll;
    scrollbar-width: none;
  }

  .contentContainer::-webkit-scrollbar {
    display: none;
  }

  wui-icon-box {
    width: 40px;
    height: 40px;
    border-radius: ${({ borderRadius }) => borderRadius["3"]};
  }
`;
var __decorate$d = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mDepositFromExchangeSelectAssetView = class W3mDepositFromExchangeSelectAssetView2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.assets = ExchangeController.state.assets;
    this.search = "";
    this.onDebouncedSearch = CoreHelperUtil.debounce((value) => {
      this.search = value;
    });
    this.unsubscribe.push(...[
      ExchangeController.subscribe((val) => {
        this.assets = val.assets;
      })
    ]);
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    return T`
      <wui-flex flexDirection="column">
        ${this.templateSearchInput()} <wui-separator></wui-separator> ${this.templateTokens()}
      </wui-flex>
    `;
  }
  templateSearchInput() {
    return T`
      <wui-flex gap="2" padding="3">
        <wui-input-text
          @inputChange=${this.onInputChange.bind(this)}
          class="network-search-input"
          size="sm"
          placeholder="Search token"
          icon="search"
        ></wui-input-text>
      </wui-flex>
    `;
  }
  templateTokens() {
    const filteredAssets = this.assets.filter((asset) => asset.metadata.name.toLowerCase().includes(this.search.toLowerCase()));
    const hasAssets = filteredAssets.length > 0;
    return T`
      <wui-flex
        class="contentContainer"
        flexDirection="column"
        .padding=${["0", "3", "0", "3"]}
      >
        <wui-flex justifyContent="flex-start" .padding=${["4", "3", "3", "3"]}>
          <wui-text variant="md-medium" color="secondary">Available tokens</wui-text>
        </wui-flex>
        <wui-flex flexDirection="column" gap="2">
          ${hasAssets ? filteredAssets.map((asset) => T`<wui-list-item
                    .imageSrc=${asset.metadata.iconUrl}
                    ?clickable=${true}
                    @click=${this.handleTokenClick.bind(this, asset)}
                  >
                    <wui-text variant="md-medium" color="primary">${asset.metadata.name}</wui-text>
                    <wui-text variant="md-regular" color="secondary"
                      >${asset.metadata.symbol}</wui-text
                    >
                  </wui-list-item>`) : T`<wui-flex
                .padding=${["20", "0", "0", "0"]}
                alignItems="center"
                flexDirection="column"
                gap="4"
              >
                <wui-icon-box icon="coinPlaceholder" color="default" size="lg"></wui-icon-box>
                <wui-flex
                  class="textContent"
                  gap="2"
                  flexDirection="column"
                  justifyContent="center"
                >
                  <wui-text variant="lg-medium" align="center" color="primary">
                    No tokens found
                  </wui-text>
                </wui-flex>
                <wui-link @click=${this.onBuyClick.bind(this)}>Buy</wui-link>
              </wui-flex>`}
        </wui-flex>
      </wui-flex>
    `;
  }
  onBuyClick() {
    RouterController.push("OnRampProviders");
  }
  onInputChange(event) {
    this.onDebouncedSearch(event.detail);
  }
  handleTokenClick(asset) {
    ExchangeController.setPaymentAsset(asset);
    RouterController.goBack();
  }
};
W3mDepositFromExchangeSelectAssetView.styles = styles$c;
__decorate$d([
  r()
], W3mDepositFromExchangeSelectAssetView.prototype, "assets", void 0);
__decorate$d([
  r()
], W3mDepositFromExchangeSelectAssetView.prototype, "search", void 0);
W3mDepositFromExchangeSelectAssetView = __decorate$d([
  customElement("w3m-deposit-from-exchange-select-asset-view")
], W3mDepositFromExchangeSelectAssetView);
const payWithExchange = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get W3mDepositFromExchangeSelectAssetView() {
    return W3mDepositFromExchangeSelectAssetView;
  },
  get W3mDepositFromExchangeView() {
    return W3mDepositFromExchangeView;
  }
});
const styles$b = i$1`
  :host > wui-flex:first-child {
    height: 500px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  :host > wui-flex:first-child::-webkit-scrollbar {
    display: none;
  }
`;
var __decorate$c = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mTransactionsView = class W3mTransactionsView2 extends i {
  render() {
    return T`
      <wui-flex flexDirection="column" .padding=${["0", "3", "3", "3"]} gap="3">
        <w3m-activity-list page="activity"></w3m-activity-list>
      </wui-flex>
    `;
  }
};
W3mTransactionsView.styles = styles$b;
W3mTransactionsView = __decorate$c([
  customElement("w3m-transactions-view")
], W3mTransactionsView);
const transactions = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get W3mTransactionsView() {
    return W3mTransactionsView;
  }
});
const styles$a = i$1`
  .email-sufixes {
    display: flex;
    flex-direction: row;
    gap: var(--wui-spacing-3xs);
    overflow-x: auto;
    max-width: 100%;
    margin-top: var(--wui-spacing-s);
    margin-bottom: calc(-1 * var(--wui-spacing-m));
    padding-bottom: var(--wui-spacing-m);
    margin-left: calc(-1 * var(--wui-spacing-m));
    margin-right: calc(-1 * var(--wui-spacing-m));
    padding-left: var(--wui-spacing-m);
    padding-right: var(--wui-spacing-m);

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
var __decorate$b = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
const options = [
  "@gmail.com",
  "@outlook.com",
  "@yahoo.com",
  "@hotmail.com",
  "@aol.com",
  "@icloud.com",
  "@zoho.com"
];
let W3mEmailSuffixesWidget = class W3mEmailSuffixesWidget2 extends i {
  constructor() {
    super(...arguments);
    this.email = "";
  }
  render() {
    const items = options.filter(this.filter.bind(this)).map(this.item.bind(this));
    if (items.length === 0) {
      return null;
    }
    return T`<div class="email-sufixes">${items}</div>`;
  }
  filter(option) {
    if (!this.email) {
      return false;
    }
    const pieces = this.email.split("@");
    if (pieces.length < 2) {
      return true;
    }
    const host = pieces.pop();
    return option.includes(host) && option !== `@${host}`;
  }
  item(option) {
    const handleClick = () => {
      const pieces = this.email.split("@");
      if (pieces.length > 1) {
        pieces.pop();
      }
      const newEmail = pieces[0] + option;
      this.dispatchEvent(new CustomEvent("change", {
        detail: newEmail,
        bubbles: true,
        composed: true
      }));
    };
    return T`<wui-button variant="neutral" size="sm" @click=${handleClick}
      >${option}</wui-button
    >`;
  }
};
W3mEmailSuffixesWidget.styles = [styles$a];
__decorate$b([
  n()
], W3mEmailSuffixesWidget.prototype, "email", void 0);
W3mEmailSuffixesWidget = __decorate$b([
  customElement("w3m-email-suffixes-widget")
], W3mEmailSuffixesWidget);
const styles$9 = i$1`
  .recent-emails {
    display: flex;
    flex-direction: column;
    padding: var(--wui-spacing-s) 0;
    border-top: 1px solid var(--wui-color-gray-glass-005);
    border-bottom: 1px solid var(--wui-color-gray-glass-005);
  }

  .recent-emails-heading {
    margin-bottom: var(--wui-spacing-s);
  }

  .recent-emails-list-item {
    --wui-color-gray-glass-002: transparent;
  }
`;
var __decorate$a = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mRecentEmailsWidget = class W3mRecentEmailsWidget2 extends i {
  constructor() {
    super(...arguments);
    this.emails = [];
  }
  render() {
    if (this.emails.length === 0) {
      return null;
    }
    return T`<div class="recent-emails">
      <wui-text variant="micro-600" color="fg-200" class="recent-emails-heading"
        >Recently used emails</wui-text
      >
      ${this.emails.map(this.item.bind(this))}
    </div>`;
  }
  item(email2) {
    const handleClick = () => {
      this.dispatchEvent(new CustomEvent("select", {
        detail: email2,
        bubbles: true,
        composed: true
      }));
    };
    return T`<wui-list-item
      @click=${handleClick}
      ?chevron=${true}
      icon="mail"
      iconVariant="overlay"
      class="recent-emails-list-item"
    >
      <wui-text variant="paragraph-500" color="fg-100">${email2}</wui-text>
    </wui-list-item>`;
  }
};
W3mRecentEmailsWidget.styles = [styles$9];
__decorate$a([
  n()
], W3mRecentEmailsWidget.prototype, "emails", void 0);
W3mRecentEmailsWidget = __decorate$a([
  customElement("w3m-recent-emails-widget")
], W3mRecentEmailsWidget);
var __decorate$9 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mDataCaptureOtpConfirmView = class W3mDataCaptureOtpConfirmView2 extends W3mEmailOtpWidget {
  constructor() {
    super(...arguments);
    this.siwx = OptionsController.state.siwx;
    this.onOtpSubmit = async (otp) => {
      await this.siwx.confirmEmailOtp({ code: otp });
      RouterController.replace("SIWXSignMessage");
    };
    this.onOtpResend = async (email2) => {
      const accountData = ChainController.getAccountData();
      if (!accountData?.caipAddress) {
        throw new Error("No account data found");
      }
      await this.siwx.requestEmailOtp({
        email: email2,
        account: accountData.caipAddress
      });
    };
  }
  connectedCallback() {
    if (!this.siwx || !(this.siwx instanceof ReownAuthentication)) {
      SnackController.showError("ReownAuthentication is not initialized.");
    }
    super.connectedCallback();
  }
  shouldSubmitOnOtpChange() {
    return this.otp.length === W3mEmailOtpWidget.OTP_LENGTH;
  }
};
__decorate$9([
  r()
], W3mDataCaptureOtpConfirmView.prototype, "siwx", void 0);
W3mDataCaptureOtpConfirmView = __decorate$9([
  customElement("w3m-data-capture-otp-confirm-view")
], W3mDataCaptureOtpConfirmView);
const styles$8 = i$1`
  .hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--wui-spacing-3xs);

    transition-property: margin, height;
    transition-duration: var(--wui-duration-md);
    transition-timing-function: var(--wui-ease-out-power-1);
    margin-top: -100px;

    &[data-state='loading'] {
      margin-top: 0px;
    }

    position: relative;
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      height: 252px;
      width: 360px;
      background: radial-gradient(
        96.11% 53.95% at 50% 51.28%,
        transparent 0%,
        color-mix(in srgb, var(--wui-color-bg-100) 5%, transparent) 49%,
        color-mix(in srgb, var(--wui-color-bg-100) 65%, transparent) 99.43%
      );
    }
  }

  .hero-main-icon {
    width: 176px;
    transition-property: background-color;
    transition-duration: var(--wui-duration-lg);
    transition-timing-function: var(--wui-ease-out-power-1);

    &[data-state='loading'] {
      width: 56px;
    }
  }

  .hero-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: var(--wui-spacing-3xs);
    flex-wrap: nowrap;
    min-width: fit-content;

    &:nth-child(1) {
      transform: translateX(-30px);
    }

    &:nth-child(2) {
      transform: translateX(30px);
    }

    &:nth-child(4) {
      transform: translateX(40px);
    }

    transition-property: height;
    transition-duration: var(--wui-duration-md);
    transition-timing-function: var(--wui-ease-out-power-1);
    height: 68px;

    &[data-state='loading'] {
      height: 0px;
    }
  }

  .hero-row-icon {
    opacity: 0.1;
    transition-property: opacity;
    transition-duration: var(--wui-duration-md);
    transition-timing-function: var(--wui-ease-out-power-1);

    &[data-state='loading'] {
      opacity: 0;
    }
  }
`;
var __decorate$8 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mDataCaptureView = class W3mDataCaptureView2 extends i {
  constructor() {
    super(...arguments);
    this.email = RouterController.state.data?.email ?? ChainController.getAccountData()?.user?.email ?? "";
    this.address = ChainController.getAccountData()?.address ?? "";
    this.loading = false;
    this.appName = OptionsController.state.metadata?.name ?? "AppKit";
    this.siwx = OptionsController.state.siwx;
    this.isRequired = Array.isArray(OptionsController.state.remoteFeatures?.emailCapture) && OptionsController.state.remoteFeatures?.emailCapture.includes("required");
    this.recentEmails = this.getRecentEmails();
  }
  connectedCallback() {
    if (!this.siwx || !(this.siwx instanceof ReownAuthentication)) {
      SnackController.showError("ReownAuthentication is not initialized. Please contact support.");
    }
    super.connectedCallback();
  }
  firstUpdated() {
    this.loading = false;
    this.recentEmails = this.getRecentEmails();
    if (this.email) {
      this.onSubmit();
    }
  }
  render() {
    return T`
      <wui-flex flexDirection="column" .padding=${["3xs", "m", "m", "m"]} gap="l">
        ${this.hero()} ${this.paragraph()} ${this.emailInput()} ${this.recentEmailsWidget()}
        ${this.footerActions()}
      </wui-flex>
    `;
  }
  hero() {
    return T`
      <div class="hero" data-state=${this.loading ? "loading" : "default"}>
        ${this.heroRow(["id", "mail", "wallet", "x", "solana", "qrCode"])}
        ${this.heroRow(["mail", "farcaster", "wallet", "discord", "mobile", "qrCode"])}
        <div class="hero-row">
          ${this.heroIcon("github")} ${this.heroIcon("bank")}
          <wui-icon-box
            size="xl"
            iconSize="xxl"
            iconColor=${this.loading ? "fg-100" : "accent-100"}
            backgroundColor=${this.loading ? "fg-100" : "accent-100"}
            icon=${this.loading ? "id" : "user"}
            isOpaque
            class="hero-main-icon"
            data-state=${this.loading ? "loading" : "default"}
          >
          </wui-icon-box>
          ${this.heroIcon("id")} ${this.heroIcon("card")}
        </div>
        ${this.heroRow(["google", "id", "github", "verify", "apple", "mobile"])}
      </div>
    `;
  }
  heroRow(icons) {
    return T`
      <div class="hero-row" data-state=${this.loading ? "loading" : "default"}>
        ${icons.map(this.heroIcon.bind(this))}
      </div>
    `;
  }
  heroIcon(icon) {
    return T`
      <wui-icon-box
        size="xl"
        iconSize="xxl"
        iconColor="fg-100"
        backgroundColor="fg-100"
        icon=${icon}
        data-state=${this.loading ? "loading" : "default"}
        isOpaque
        class="hero-row-icon"
      >
      </wui-icon-box>
    `;
  }
  paragraph() {
    if (this.loading) {
      return T`
        <wui-text variant="paragraph-400" color="fg-200" align="center"
          >We are verifying your account with email
          <wui-text variant="paragraph-600" color="accent-100">${this.email}</wui-text> and address
          <wui-text variant="paragraph-600" color="fg-100">
            ${UiHelperUtil.getTruncateString({
        string: this.address,
        charsEnd: 4,
        charsStart: 4,
        truncate: "middle"
      })} </wui-text
          >, please wait a moment.</wui-text
        >
      `;
    }
    if (this.isRequired) {
      return T`
        <wui-text variant="paragraph-600" color="fg-100" align="center">
          ${this.appName} requires your email for authentication.
        </wui-text>
      `;
    }
    return T`
      <wui-flex flexDirection="column" gap="xs" alignItems="center">
        <wui-text variant="paragraph-600" color="fg-100" align="center" size>
          ${this.appName} would like to collect your email.
        </wui-text>

        <wui-text variant="small-400" color="fg-200" align="center">
          Don't worry, it's optional&mdash;you can skip this step.
        </wui-text>
      </wui-flex>
    `;
  }
  emailInput() {
    if (this.loading) {
      return null;
    }
    const keydownHandler = (event) => {
      if (event.key === "Enter") {
        this.onSubmit();
      }
    };
    const changeHandler = (event) => {
      this.email = event.detail;
    };
    return T`
      <wui-flex flexDirection="column">
        <wui-email-input
          .value=${this.email}
          .disabled=${this.loading}
          @inputChange=${changeHandler}
          @keydown=${keydownHandler}
        ></wui-email-input>

        <w3m-email-suffixes-widget
          .email=${this.email}
          @change=${changeHandler}
        ></w3m-email-suffixes-widget>
      </wui-flex>
    `;
  }
  recentEmailsWidget() {
    if (this.recentEmails.length === 0 || this.loading) {
      return null;
    }
    const recentEmailSelectHandler = (event) => {
      this.email = event.detail;
      this.onSubmit();
    };
    return T`
      <w3m-recent-emails-widget
        .emails=${this.recentEmails}
        @select=${recentEmailSelectHandler}
      ></w3m-recent-emails-widget>
    `;
  }
  footerActions() {
    return T`
      <wui-flex flexDirection="row" fullWidth gap="s">
        ${this.isRequired ? null : T`<wui-button
              size="lg"
              variant="neutral"
              fullWidth
              .disabled=${this.loading}
              @click=${this.onSkip.bind(this)}
              >Skip this step</wui-button
            >`}

        <wui-button
          size="lg"
          variant="main"
          type="submit"
          fullWidth
          .disabled=${!this.email || !this.isValidEmail(this.email)}
          .loading=${this.loading}
          @click=${this.onSubmit.bind(this)}
        >
          Continue
        </wui-button>
      </wui-flex>
    `;
  }
  async onSubmit() {
    if (!(this.siwx instanceof ReownAuthentication)) {
      SnackController.showError("ReownAuthentication is not initialized. Please contact support.");
      return;
    }
    const account = ChainController.getActiveCaipAddress();
    if (!account) {
      throw new Error("Account is not connected.");
    }
    if (!this.isValidEmail(this.email)) {
      SnackController.showError("Please provide a valid email.");
      return;
    }
    try {
      this.loading = true;
      const otp = await this.siwx.requestEmailOtp({
        email: this.email,
        account
      });
      this.pushRecentEmail(this.email);
      if (otp.uuid === null) {
        RouterController.replace("SIWXSignMessage");
      } else {
        RouterController.replace("DataCaptureOtpConfirm", { email: this.email });
      }
    } catch (error) {
      SnackController.showError("Failed to send email OTP");
      this.loading = false;
    }
  }
  onSkip() {
    RouterController.replace("SIWXSignMessage");
  }
  getRecentEmails() {
    const recentEmails = SafeLocalStorage.getItem(SafeLocalStorageKeys.RECENT_EMAILS);
    const parsedEmails = recentEmails ? recentEmails.split(",") : [];
    return parsedEmails.filter(this.isValidEmail.bind(this)).slice(0, 3);
  }
  pushRecentEmail(email2) {
    const recentEmails = this.getRecentEmails();
    const newEmails = Array.from(/* @__PURE__ */ new Set([email2, ...recentEmails])).slice(0, 3);
    SafeLocalStorage.setItem(SafeLocalStorageKeys.RECENT_EMAILS, newEmails.join(","));
  }
  isValidEmail(email2) {
    return /^\S+@\S+\.\S+$/u.test(email2);
  }
};
W3mDataCaptureView.styles = [styles$8];
__decorate$8([
  r()
], W3mDataCaptureView.prototype, "email", void 0);
__decorate$8([
  r()
], W3mDataCaptureView.prototype, "address", void 0);
__decorate$8([
  r()
], W3mDataCaptureView.prototype, "loading", void 0);
__decorate$8([
  r()
], W3mDataCaptureView.prototype, "appName", void 0);
__decorate$8([
  r()
], W3mDataCaptureView.prototype, "siwx", void 0);
__decorate$8([
  r()
], W3mDataCaptureView.prototype, "isRequired", void 0);
__decorate$8([
  r()
], W3mDataCaptureView.prototype, "recentEmails", void 0);
W3mDataCaptureView = __decorate$8([
  customElement("w3m-data-capture-view")
], W3mDataCaptureView);
const dataCapture = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get W3mDataCaptureOtpConfirmView() {
    return W3mDataCaptureOtpConfirmView;
  },
  get W3mDataCaptureView() {
    return W3mDataCaptureView;
  },
  get W3mEmailSuffixesWidget() {
    return W3mEmailSuffixesWidget;
  },
  get W3mRecentEmailsWidget() {
    return W3mRecentEmailsWidget;
  }
});
const styles$7 = css`
  :host {
    display: block;
    position: absolute;
    top: ${({ spacing }) => spacing["3"]};
    left: ${({ spacing }) => spacing["4"]};
    right: ${({ spacing }) => spacing["4"]};
    opacity: 0;
    pointer-events: none;
  }
`;
var __decorate$7 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
const presets = {
  info: {
    backgroundColor: "fg-350",
    iconColor: "fg-325",
    icon: "info"
  },
  success: {
    backgroundColor: "success-glass-reown-020",
    iconColor: "success-125",
    icon: "checkmark"
  },
  warning: {
    backgroundColor: "warning-glass-reown-020",
    iconColor: "warning-100",
    icon: "warningCircle"
  },
  error: {
    backgroundColor: "error-glass-reown-020",
    iconColor: "error-125",
    icon: "warning"
  }
};
let W3mAlertBar = class W3mAlertBar2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.open = AlertController.state.open;
    this.onOpen(true);
    this.unsubscribe.push(AlertController.subscribeKey("open", (val) => {
      this.open = val;
      this.onOpen(false);
    }));
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    const { message, variant } = AlertController.state;
    const preset = presets[variant];
    return T`
      <wui-alertbar
        message=${message}
        backgroundColor=${preset?.backgroundColor}
        iconColor=${preset?.iconColor}
        icon=${preset?.icon}
        type=${variant}
      ></wui-alertbar>
    `;
  }
  onOpen(isMounted) {
    if (this.open) {
      this.animate([
        { opacity: 0, transform: "scale(0.85)" },
        { opacity: 1, transform: "scale(1)" }
      ], {
        duration: 150,
        fill: "forwards",
        easing: "ease"
      });
      this.style.cssText = `pointer-events: auto`;
    } else if (!isMounted) {
      this.animate([
        { opacity: 1, transform: "scale(1)" },
        { opacity: 0, transform: "scale(0.85)" }
      ], {
        duration: 150,
        fill: "forwards",
        easing: "ease"
      });
      this.style.cssText = `pointer-events: none`;
    }
  }
};
W3mAlertBar.styles = styles$7;
__decorate$7([
  r()
], W3mAlertBar.prototype, "open", void 0);
W3mAlertBar = __decorate$7([
  customElement("w3m-alertbar")
], W3mAlertBar);
const styles$6 = css`
  wui-image {
    border-radius: ${({ borderRadius }) => borderRadius.round};
  }

  .transfers-badge {
    background-color: ${({ tokens }) => tokens.theme.foregroundPrimary};
    border: 1px solid ${({ tokens }) => tokens.theme.foregroundSecondary};
    border-radius: ${({ borderRadius }) => borderRadius[4]};
  }
`;
var __decorate$6 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mPayHeader = class W3mPayHeader2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.paymentAsset = PayController.state.paymentAsset;
    this.amount = PayController.state.amount;
    this.unsubscribe.push(PayController.subscribeKey("paymentAsset", (val) => {
      this.paymentAsset = val;
    }), PayController.subscribeKey("amount", (val) => {
      this.amount = val;
    }));
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    const allNetworks = ChainController.getAllRequestedCaipNetworks();
    const targetNetwork = allNetworks.find((net) => net.caipNetworkId === this.paymentAsset.network);
    return T`<wui-flex
      alignItems="center"
      gap="1"
      .padding=${["1", "2", "1", "1"]}
      class="transfers-badge"
    >
      <wui-image src=${o(this.paymentAsset.metadata.logoURI)} size="xl"></wui-image>
      <wui-text variant="lg-regular" color="primary">
        ${this.amount} ${this.paymentAsset.metadata.symbol}
      </wui-text>
      <wui-text variant="sm-regular" color="secondary">
        on ${targetNetwork?.name ?? "Unknown"}
      </wui-text>
    </wui-flex>`;
  }
};
W3mPayHeader.styles = [styles$6];
__decorate$6([
  n()
], W3mPayHeader.prototype, "paymentAsset", void 0);
__decorate$6([
  n()
], W3mPayHeader.prototype, "amount", void 0);
W3mPayHeader = __decorate$6([
  customElement("w3m-pay-header")
], W3mPayHeader);
const styles$5 = css`
  :host {
    height: 60px;
  }

  :host > wui-flex {
    box-sizing: border-box;
    background-color: var(--local-header-background-color);
  }

  wui-text {
    background-color: var(--local-header-background-color);
  }

  wui-flex.w3m-header-title {
    transform: translateY(0);
    opacity: 1;
  }

  wui-flex.w3m-header-title[view-direction='prev'] {
    animation:
      slide-down-out 120ms forwards ${({ easings }) => easings["ease-out-power-2"]},
      slide-down-in 120ms forwards ${({ easings }) => easings["ease-out-power-2"]};
    animation-delay: 0ms, 200ms;
  }

  wui-flex.w3m-header-title[view-direction='next'] {
    animation:
      slide-up-out 120ms forwards ${({ easings }) => easings["ease-out-power-2"]},
      slide-up-in 120ms forwards ${({ easings }) => easings["ease-out-power-2"]};
    animation-delay: 0ms, 200ms;
  }

  wui-icon-button[data-hidden='true'] {
    opacity: 0 !important;
    pointer-events: none;
  }

  @keyframes slide-up-out {
    from {
      transform: translateY(0px);
      opacity: 1;
    }
    to {
      transform: translateY(3px);
      opacity: 0;
    }
  }

  @keyframes slide-up-in {
    from {
      transform: translateY(-3px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slide-down-out {
    from {
      transform: translateY(0px);
      opacity: 1;
    }
    to {
      transform: translateY(-3px);
      opacity: 0;
    }
  }

  @keyframes slide-down-in {
    from {
      transform: translateY(3px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;
var __decorate$5 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
const BETA_SCREENS = ["SmartSessionList"];
const BACKGROUND_OVERRIDES = {
  PayWithExchange: vars.tokens.theme.foregroundPrimary
};
function headings() {
  const connectorName = RouterController.state.data?.connector?.name;
  const walletName = RouterController.state.data?.wallet?.name;
  const networkName = RouterController.state.data?.network?.name;
  const name = walletName ?? connectorName;
  const connectors = ConnectorController.getConnectors();
  const isEmail = connectors.length === 1 && connectors[0]?.id === "w3m-email";
  const socialProvider = ChainController.getAccountData()?.socialProvider;
  const socialTitle = socialProvider ? socialProvider.charAt(0).toUpperCase() + socialProvider.slice(1) : "Connect Social";
  return {
    Connect: `Connect ${isEmail ? "Email" : ""} Wallet`,
    Create: "Create Wallet",
    ChooseAccountName: void 0,
    Account: void 0,
    AccountSettings: void 0,
    AllWallets: "All Wallets",
    ApproveTransaction: "Approve Transaction",
    BuyInProgress: "Buy",
    UsageExceeded: "Usage Exceeded",
    ConnectingExternal: name ?? "Connect Wallet",
    ConnectingWalletConnect: name ?? "WalletConnect",
    ConnectingWalletConnectBasic: "WalletConnect",
    ConnectingSiwe: "Sign In",
    Convert: "Convert",
    ConvertSelectToken: "Select token",
    ConvertPreview: "Preview Convert",
    Downloads: name ? `Get ${name}` : "Downloads",
    EmailLogin: "Email Login",
    EmailVerifyOtp: "Confirm Email",
    EmailVerifyDevice: "Register Device",
    GetWallet: "Get a Wallet",
    Networks: "Choose Network",
    OnRampProviders: "Choose Provider",
    OnRampActivity: "Activity",
    OnRampTokenSelect: "Select Token",
    OnRampFiatSelect: "Select Currency",
    Pay: "How you pay",
    ProfileWallets: "Wallets",
    SwitchNetwork: networkName ?? "Switch Network",
    Transactions: "Activity",
    UnsupportedChain: "Switch Network",
    UpgradeEmailWallet: "Upgrade Your Wallet",
    UpdateEmailWallet: "Edit Email",
    UpdateEmailPrimaryOtp: "Confirm Current Email",
    UpdateEmailSecondaryOtp: "Confirm New Email",
    WhatIsABuy: "What is Buy?",
    RegisterAccountName: "Choose Name",
    RegisterAccountNameSuccess: "",
    WalletReceive: "Receive",
    WalletCompatibleNetworks: "Compatible Networks",
    Swap: "Swap",
    SwapSelectToken: "Select Token",
    SwapPreview: "Preview Swap",
    WalletSend: "Send",
    WalletSendPreview: "Review Send",
    WalletSendSelectToken: "Select Token",
    WalletSendConfirmed: "Confirmed",
    WhatIsANetwork: "What is a network?",
    WhatIsAWallet: "What is a Wallet?",
    ConnectWallets: "Connect Wallet",
    ConnectSocials: "All Socials",
    ConnectingSocial: socialTitle,
    ConnectingMultiChain: "Select Chain",
    ConnectingFarcaster: "Farcaster",
    SwitchActiveChain: "Switch Chain",
    SmartSessionCreated: void 0,
    SmartSessionList: "Smart Sessions",
    SIWXSignMessage: "Sign In",
    PayLoading: "Processing payment...",
    PayQuote: "Payment Quote",
    DataCapture: "Profile",
    DataCaptureOtpConfirm: "Confirm Email",
    FundWallet: "Fund Wallet",
    PayWithExchange: "Deposit from Exchange",
    PayWithExchangeSelectAsset: "Select Asset",
    SmartAccountSettings: "Smart Account Settings"
  };
}
let W3mHeader = class W3mHeader2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.heading = headings()[RouterController.state.view];
    this.network = ChainController.state.activeCaipNetwork;
    this.networkImage = AssetUtil.getNetworkImage(this.network);
    this.showBack = false;
    this.prevHistoryLength = 1;
    this.view = RouterController.state.view;
    this.viewDirection = "";
    this.unsubscribe.push(AssetController.subscribeNetworkImages(() => {
      this.networkImage = AssetUtil.getNetworkImage(this.network);
    }), RouterController.subscribeKey("view", (val) => {
      setTimeout(() => {
        this.view = val;
        this.heading = headings()[val];
      }, ConstantsUtil.ANIMATION_DURATIONS.HeaderText);
      this.onViewChange();
      this.onHistoryChange();
    }), ChainController.subscribeKey("activeCaipNetwork", (val) => {
      this.network = val;
      this.networkImage = AssetUtil.getNetworkImage(this.network);
    }));
  }
  disconnectCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    const backgroundColor = BACKGROUND_OVERRIDES[RouterController.state.view] ?? vars.tokens.theme.backgroundPrimary;
    this.style.setProperty("--local-header-background-color", backgroundColor);
    return T`
      <wui-flex
        .padding=${["0", "4", "0", "4"]}
        justifyContent="space-between"
        alignItems="center"
      >
        ${this.leftHeaderTemplate()} ${this.titleTemplate()} ${this.rightHeaderTemplate()}
      </wui-flex>
    `;
  }
  onWalletHelp() {
    EventsController.sendEvent({ type: "track", event: "CLICK_WALLET_HELP" });
    RouterController.push("WhatIsAWallet");
  }
  async onClose() {
    await ModalUtil.safeClose();
  }
  rightHeaderTemplate() {
    const isSmartSessionsEnabled = OptionsController?.state?.features?.smartSessions;
    if (RouterController.state.view !== "Account" || !isSmartSessionsEnabled) {
      return this.closeButtonTemplate();
    }
    return T`<wui-flex>
      <wui-icon-button
        icon="clock"
        size="lg"
        iconSize="lg"
        type="neutral"
        variant="primary"
        @click=${() => RouterController.push("SmartSessionList")}
        data-testid="w3m-header-smart-sessions"
      ></wui-icon-button>
      ${this.closeButtonTemplate()}
    </wui-flex> `;
  }
  closeButtonTemplate() {
    return T`
      <wui-icon-button
        icon="close"
        size="lg"
        type="neutral"
        variant="primary"
        iconSize="lg"
        @click=${this.onClose.bind(this)}
        data-testid="w3m-header-close"
      ></wui-icon-button>
    `;
  }
  titleTemplate() {
    if (this.view === "PayQuote") {
      return T`<w3m-pay-header></w3m-pay-header>`;
    }
    const isBeta = BETA_SCREENS.includes(this.view);
    return T`
      <wui-flex
        view-direction="${this.viewDirection}"
        class="w3m-header-title"
        alignItems="center"
        gap="2"
      >
        <wui-text
          display="inline"
          variant="lg-regular"
          color="primary"
          data-testid="w3m-header-text"
        >
          ${this.heading}
        </wui-text>
        ${isBeta ? T`<wui-tag variant="accent" size="md">Beta</wui-tag>` : null}
      </wui-flex>
    `;
  }
  leftHeaderTemplate() {
    const { view } = RouterController.state;
    const isConnectHelp = view === "Connect";
    const isEmbeddedEnable = OptionsController.state.enableEmbedded;
    const isApproveTransaction = view === "ApproveTransaction";
    const isConnectingSIWEView = view === "ConnectingSiwe";
    const isAccountView = view === "Account";
    const enableNetworkSwitch = OptionsController.state.enableNetworkSwitch;
    const shouldHideBack = isApproveTransaction || isConnectingSIWEView || isConnectHelp && isEmbeddedEnable;
    if (isAccountView && enableNetworkSwitch) {
      return T`<wui-select
        id="dynamic"
        data-testid="w3m-account-select-network"
        active-network=${o(this.network?.name)}
        @click=${this.onNetworks.bind(this)}
        imageSrc=${o(this.networkImage)}
      ></wui-select>`;
    }
    if (this.showBack && !shouldHideBack) {
      return T`<wui-icon-button
        data-testid="header-back"
        id="dynamic"
        icon="chevronLeft"
        size="lg"
        iconSize="lg"
        type="neutral"
        variant="primary"
        @click=${this.onGoBack.bind(this)}
      ></wui-icon-button>`;
    }
    return T`<wui-icon-button
      data-hidden=${!isConnectHelp}
      id="dynamic"
      icon="helpCircle"
      size="lg"
      iconSize="lg"
      type="neutral"
      variant="primary"
      @click=${this.onWalletHelp.bind(this)}
    ></wui-icon-button>`;
  }
  onNetworks() {
    if (this.isAllowedNetworkSwitch()) {
      EventsController.sendEvent({ type: "track", event: "CLICK_NETWORKS" });
      RouterController.push("Networks");
    }
  }
  isAllowedNetworkSwitch() {
    const requestedCaipNetworks = ChainController.getAllRequestedCaipNetworks();
    const isMultiNetwork = requestedCaipNetworks ? requestedCaipNetworks.length > 1 : false;
    const isValidNetwork = requestedCaipNetworks?.find(({ id }) => id === this.network?.id);
    return isMultiNetwork || !isValidNetwork;
  }
  onViewChange() {
    const { history } = RouterController.state;
    let direction = ConstantsUtil.VIEW_DIRECTION.Next;
    if (history.length < this.prevHistoryLength) {
      direction = ConstantsUtil.VIEW_DIRECTION.Prev;
    }
    this.prevHistoryLength = history.length;
    this.viewDirection = direction;
  }
  async onHistoryChange() {
    const { history } = RouterController.state;
    const buttonEl = this.shadowRoot?.querySelector("#dynamic");
    if (history.length > 1 && !this.showBack && buttonEl) {
      await buttonEl.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 200,
        fill: "forwards",
        easing: "ease"
      }).finished;
      this.showBack = true;
      buttonEl.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 200,
        fill: "forwards",
        easing: "ease"
      });
    } else if (history.length <= 1 && this.showBack && buttonEl) {
      await buttonEl.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 200,
        fill: "forwards",
        easing: "ease"
      }).finished;
      this.showBack = false;
      buttonEl.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 200,
        fill: "forwards",
        easing: "ease"
      });
    }
  }
  onGoBack() {
    RouterController.goBack();
  }
};
W3mHeader.styles = styles$5;
__decorate$5([
  r()
], W3mHeader.prototype, "heading", void 0);
__decorate$5([
  r()
], W3mHeader.prototype, "network", void 0);
__decorate$5([
  r()
], W3mHeader.prototype, "networkImage", void 0);
__decorate$5([
  r()
], W3mHeader.prototype, "showBack", void 0);
__decorate$5([
  r()
], W3mHeader.prototype, "prevHistoryLength", void 0);
__decorate$5([
  r()
], W3mHeader.prototype, "view", void 0);
__decorate$5([
  r()
], W3mHeader.prototype, "viewDirection", void 0);
W3mHeader = __decorate$5([
  customElement("w3m-header")
], W3mHeader);
const styles$4 = i$1`
  :host {
    display: block;
    position: absolute;
    opacity: 0;
    pointer-events: none;
    top: 11px;
    left: 50%;
    width: max-content;
  }
`;
var __decorate$4 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mSnackBar = class W3mSnackBar2 extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.timeout = void 0;
    this.open = SnackController.state.open;
    this.unsubscribe.push(SnackController.subscribeKey("open", (val) => {
      this.open = val;
      this.onOpen();
    }));
  }
  disconnectedCallback() {
    clearTimeout(this.timeout);
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
  }
  render() {
    const { message, variant } = SnackController.state;
    return T` <wui-snackbar message=${message} variant=${variant}></wui-snackbar> `;
  }
  onOpen() {
    clearTimeout(this.timeout);
    if (this.open) {
      this.animate([
        { opacity: 0, transform: "translateX(-50%) scale(0.85)" },
        { opacity: 1, transform: "translateX(-50%) scale(1)" }
      ], {
        duration: 150,
        fill: "forwards",
        easing: "ease"
      });
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      if (SnackController.state.autoClose) {
        this.timeout = setTimeout(() => SnackController.hide(), 2500);
      }
    } else {
      this.animate([
        { opacity: 1, transform: "translateX(-50%) scale(1)" },
        { opacity: 0, transform: "translateX(-50%) scale(0.85)" }
      ], {
        duration: 150,
        fill: "forwards",
        easing: "ease"
      });
    }
  }
};
W3mSnackBar.styles = styles$4;
__decorate$4([
  r()
], W3mSnackBar.prototype, "open", void 0);
W3mSnackBar = __decorate$4([
  customElement("w3m-snackbar")
], W3mSnackBar);
const styles$3 = css`
  :host {
    z-index: ${({ tokens }) => tokens.core.zIndex};
    display: block;
    backface-visibility: hidden;
    will-change: opacity;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    opacity: 0;
    background-color: ${({ tokens }) => tokens.theme.overlay};
    backdrop-filter: blur(0px);
    transition:
      opacity ${({ durations }) => durations["lg"]} ${({ easings }) => easings["ease-out-power-2"]},
      backdrop-filter ${({ durations }) => durations["lg"]}
        ${({ easings }) => easings["ease-out-power-2"]};
    will-change: opacity;
  }

  :host(.open) {
    opacity: 1;
    backdrop-filter: blur(8px);
  }

  :host(.appkit-modal) {
    position: relative;
    pointer-events: unset;
    background: none;
    width: 100%;
    opacity: 1;
  }

  wui-card {
    max-width: var(--apkt-modal-width);
    width: 100%;
    position: relative;
    outline: none;
    transform: translateY(4px);
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
    transition:
      transform ${({ durations }) => durations["lg"]}
        ${({ easings }) => easings["ease-out-power-2"]},
      border-radius ${({ durations }) => durations["lg"]}
        ${({ easings }) => easings["ease-out-power-1"]},
      background-color ${({ durations }) => durations["lg"]}
        ${({ easings }) => easings["ease-out-power-1"]},
      box-shadow ${({ durations }) => durations["lg"]}
        ${({ easings }) => easings["ease-out-power-1"]};
    will-change: border-radius, background-color, transform, box-shadow;
    background-color: ${({ tokens }) => tokens.theme.backgroundPrimary};
    padding: var(--local-modal-padding);
    box-sizing: border-box;
  }

  :host(.open) wui-card {
    transform: translateY(0px);
  }

  wui-card::before {
    z-index: 1;
    pointer-events: none;
    content: '';
    position: absolute;
    inset: 0;
    border-radius: clamp(0px, var(--apkt-borderRadius-8), 44px);
    transition: box-shadow ${({ durations }) => durations["lg"]}
      ${({ easings }) => easings["ease-out-power-2"]};
    transition-delay: ${({ durations }) => durations["md"]};
    will-change: box-shadow;
  }

  :host([data-mobile-fullscreen='true']) wui-card::before {
    border-radius: 0px;
  }

  :host([data-border='true']) wui-card::before {
    box-shadow: inset 0px 0px 0px 4px ${({ tokens }) => tokens.theme.foregroundSecondary};
  }

  :host([data-border='false']) wui-card::before {
    box-shadow: inset 0px 0px 0px 1px ${({ tokens }) => tokens.theme.borderPrimaryDark};
  }

  :host([data-border='true']) wui-card {
    animation:
      fade-in ${({ durations }) => durations["lg"]} ${({ easings }) => easings["ease-out-power-2"]},
      card-background-border var(--apkt-duration-dynamic)
        ${({ easings }) => easings["ease-out-power-2"]};
    animation-fill-mode: backwards, both;
    animation-delay: var(--apkt-duration-dynamic);
  }

  :host([data-border='false']) wui-card {
    animation:
      fade-in ${({ durations }) => durations["lg"]} ${({ easings }) => easings["ease-out-power-2"]},
      card-background-default var(--apkt-duration-dynamic)
        ${({ easings }) => easings["ease-out-power-2"]};
    animation-fill-mode: backwards, both;
    animation-delay: 0s;
  }

  :host(.appkit-modal) wui-card {
    max-width: var(--apkt-modal-width);
  }

  wui-card[shake='true'] {
    animation:
      fade-in ${({ durations }) => durations["lg"]} ${({ easings }) => easings["ease-out-power-2"]},
      w3m-shake ${({ durations }) => durations["xl"]}
        ${({ easings }) => easings["ease-out-power-2"]};
  }

  wui-flex {
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  @media (max-height: 700px) and (min-width: 431px) {
    wui-flex {
      align-items: flex-start;
    }

    wui-card {
      margin: var(--apkt-spacing-6) 0px;
    }
  }

  @media (max-width: 430px) {
    :host([data-mobile-fullscreen='true']) {
      height: 100dvh;
    }
    :host([data-mobile-fullscreen='true']) wui-flex {
      align-items: stretch;
    }
    :host([data-mobile-fullscreen='true']) wui-card {
      max-width: 100%;
      height: 100%;
      border-radius: 0;
      border: none;
    }
    :host(:not([data-mobile-fullscreen='true'])) wui-flex {
      align-items: flex-end;
    }

    :host(:not([data-mobile-fullscreen='true'])) wui-card {
      max-width: 100%;
      border-bottom: none;
    }

    :host(:not([data-mobile-fullscreen='true'])) wui-card[data-embedded='true'] {
      border-bottom-left-radius: clamp(0px, var(--apkt-borderRadius-8), 44px);
      border-bottom-right-radius: clamp(0px, var(--apkt-borderRadius-8), 44px);
    }

    :host(:not([data-mobile-fullscreen='true'])) wui-card:not([data-embedded='true']) {
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
    }

    wui-card[shake='true'] {
      animation: w3m-shake 0.5s ${({ easings }) => easings["ease-out-power-2"]};
    }
  }

  @keyframes fade-in {
    0% {
      transform: scale(0.99) translateY(4px);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  @keyframes w3m-shake {
    0% {
      transform: scale(1) rotate(0deg);
    }
    20% {
      transform: scale(1) rotate(-1deg);
    }
    40% {
      transform: scale(1) rotate(1.5deg);
    }
    60% {
      transform: scale(1) rotate(-1.5deg);
    }
    80% {
      transform: scale(1) rotate(1deg);
    }
    100% {
      transform: scale(1) rotate(0deg);
    }
  }

  @keyframes card-background-border {
    from {
      background-color: ${({ tokens }) => tokens.theme.backgroundPrimary};
    }
    to {
      background-color: ${({ tokens }) => tokens.theme.foregroundSecondary};
    }
  }

  @keyframes card-background-default {
    from {
      background-color: ${({ tokens }) => tokens.theme.foregroundSecondary};
    }
    to {
      background-color: ${({ tokens }) => tokens.theme.backgroundPrimary};
    }
  }
`;
var __decorate$3 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
const SCROLL_LOCK = "scroll-lock";
const PADDING_OVERRIDES = {
  PayWithExchange: "0",
  PayWithExchangeSelectAsset: "0",
  Pay: "0",
  PayQuote: "0",
  PayLoading: "0"
};
class W3mModalBase extends i {
  constructor() {
    super();
    this.unsubscribe = [];
    this.abortController = void 0;
    this.hasPrefetched = false;
    this.enableEmbedded = OptionsController.state.enableEmbedded;
    this.open = ModalController.state.open;
    this.caipAddress = ChainController.state.activeCaipAddress;
    this.caipNetwork = ChainController.state.activeCaipNetwork;
    this.shake = ModalController.state.shake;
    this.filterByNamespace = ConnectorController.state.filterByNamespace;
    this.padding = vars.spacing[1];
    this.mobileFullScreen = OptionsController.state.enableMobileFullScreen;
    this.initializeTheming();
    ApiController.prefetchAnalyticsConfig();
    this.unsubscribe.push(...[
      ModalController.subscribeKey("open", (val) => val ? this.onOpen() : this.onClose()),
      ModalController.subscribeKey("shake", (val) => this.shake = val),
      ChainController.subscribeKey("activeCaipNetwork", (val) => this.onNewNetwork(val)),
      ChainController.subscribeKey("activeCaipAddress", (val) => this.onNewAddress(val)),
      OptionsController.subscribeKey("enableEmbedded", (val) => this.enableEmbedded = val),
      ConnectorController.subscribeKey("filterByNamespace", (val) => {
        if (this.filterByNamespace !== val && !ChainController.getAccountData(val)?.caipAddress) {
          ApiController.fetchRecommendedWallets();
          this.filterByNamespace = val;
        }
      }),
      RouterController.subscribeKey("view", () => {
        this.dataset["border"] = HelpersUtil.hasFooter() ? "true" : "false";
        this.padding = PADDING_OVERRIDES[RouterController.state.view] ?? vars.spacing[1];
      })
    ]);
  }
  firstUpdated() {
    this.dataset["border"] = HelpersUtil.hasFooter() ? "true" : "false";
    if (this.mobileFullScreen) {
      this.setAttribute("data-mobile-fullscreen", "true");
    }
    if (this.caipAddress) {
      if (this.enableEmbedded) {
        ModalController.close();
        this.prefetch();
        return;
      }
      this.onNewAddress(this.caipAddress);
    }
    if (this.open) {
      this.onOpen();
    }
    if (this.enableEmbedded) {
      this.prefetch();
    }
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((unsubscribe) => unsubscribe());
    this.onRemoveKeyboardListener();
  }
  render() {
    this.style.setProperty("--local-modal-padding", this.padding);
    if (this.enableEmbedded) {
      return T`${this.contentTemplate()}
        <w3m-tooltip></w3m-tooltip> `;
    }
    return this.open ? T`
          <wui-flex @click=${this.onOverlayClick.bind(this)} data-testid="w3m-modal-overlay">
            ${this.contentTemplate()}
          </wui-flex>
          <w3m-tooltip></w3m-tooltip>
        ` : null;
  }
  contentTemplate() {
    return T` <wui-card
      shake="${this.shake}"
      data-embedded="${o(this.enableEmbedded)}"
      role="alertdialog"
      aria-modal="true"
      tabindex="0"
      data-testid="w3m-modal-card"
    >
      <w3m-header></w3m-header>
      <w3m-router></w3m-router>
      <w3m-footer></w3m-footer>
      <w3m-snackbar></w3m-snackbar>
      <w3m-alertbar></w3m-alertbar>
    </wui-card>`;
  }
  async onOverlayClick(event) {
    if (event.target === event.currentTarget) {
      if (this.mobileFullScreen) {
        return;
      }
      await this.handleClose();
    }
  }
  async handleClose() {
    await ModalUtil.safeClose();
  }
  initializeTheming() {
    const { themeVariables, themeMode } = ThemeController.state;
    const defaultThemeMode = UiHelperUtil.getColorTheme(themeMode);
    initializeTheming(themeVariables, defaultThemeMode);
  }
  onClose() {
    this.open = false;
    this.classList.remove("open");
    this.onScrollUnlock();
    SnackController.hide();
    this.onRemoveKeyboardListener();
  }
  onOpen() {
    this.open = true;
    this.classList.add("open");
    this.onScrollLock();
    this.onAddKeyboardListener();
  }
  onScrollLock() {
    const styleTag = document.createElement("style");
    styleTag.dataset["w3m"] = SCROLL_LOCK;
    styleTag.textContent = `
      body {
        touch-action: none;
        overflow: hidden;
        overscroll-behavior: contain;
      }
      w3m-modal {
        pointer-events: auto;
      }
    `;
    document.head.appendChild(styleTag);
  }
  onScrollUnlock() {
    const styleTag = document.head.querySelector(`style[data-w3m="${SCROLL_LOCK}"]`);
    if (styleTag) {
      styleTag.remove();
    }
  }
  onAddKeyboardListener() {
    this.abortController = new AbortController();
    const card = this.shadowRoot?.querySelector("wui-card");
    card?.focus();
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        this.handleClose();
      } else if (event.key === "Tab") {
        const { tagName } = event.target;
        if (tagName && !tagName.includes("W3M-") && !tagName.includes("WUI-")) {
          card?.focus();
        }
      }
    }, this.abortController);
  }
  onRemoveKeyboardListener() {
    this.abortController?.abort();
    this.abortController = void 0;
  }
  async onNewAddress(caipAddress) {
    const isSwitchingNamespace = ChainController.state.isSwitchingNamespace;
    const isInProfileView = RouterController.state.view === "ProfileWallets";
    const shouldClose = !caipAddress && !isSwitchingNamespace && !isInProfileView;
    if (shouldClose) {
      ModalController.close();
    }
    await SIWXUtil.initializeIfEnabled(caipAddress);
    this.caipAddress = caipAddress;
    ChainController.setIsSwitchingNamespace(false);
  }
  onNewNetwork(nextCaipNetwork) {
    const prevCaipNetwork = this.caipNetwork;
    const prevCaipNetworkId = prevCaipNetwork?.caipNetworkId?.toString();
    const nextNetworkId = nextCaipNetwork?.caipNetworkId?.toString();
    const didNetworkChange = prevCaipNetworkId !== nextNetworkId;
    const isUnsupportedNetworkScreen = RouterController.state.view === "UnsupportedChain";
    const isModalOpen = ModalController.state.open;
    let shouldGoBack = false;
    if (this.enableEmbedded && RouterController.state.view === "SwitchNetwork") {
      shouldGoBack = true;
    }
    if (didNetworkChange) {
      SwapController.resetState();
    }
    if (isModalOpen && isUnsupportedNetworkScreen) {
      shouldGoBack = true;
    }
    if (shouldGoBack && RouterController.state.view !== "SIWXSignMessage") {
      RouterController.goBack();
    }
    this.caipNetwork = nextCaipNetwork;
  }
  prefetch() {
    if (!this.hasPrefetched) {
      ApiController.prefetch();
      ApiController.fetchWalletsByPage({ page: 1 });
      this.hasPrefetched = true;
    }
  }
}
W3mModalBase.styles = styles$3;
__decorate$3([
  n({ type: Boolean })
], W3mModalBase.prototype, "enableEmbedded", void 0);
__decorate$3([
  r()
], W3mModalBase.prototype, "open", void 0);
__decorate$3([
  r()
], W3mModalBase.prototype, "caipAddress", void 0);
__decorate$3([
  r()
], W3mModalBase.prototype, "caipNetwork", void 0);
__decorate$3([
  r()
], W3mModalBase.prototype, "shake", void 0);
__decorate$3([
  r()
], W3mModalBase.prototype, "filterByNamespace", void 0);
__decorate$3([
  r()
], W3mModalBase.prototype, "padding", void 0);
__decorate$3([
  r()
], W3mModalBase.prototype, "mobileFullScreen", void 0);
let W3mModal = class W3mModal2 extends W3mModalBase {
};
W3mModal = __decorate$3([
  customElement("w3m-modal")
], W3mModal);
let AppKitModal = class AppKitModal2 extends W3mModalBase {
};
AppKitModal = __decorate$3([
  customElement("appkit-modal")
], AppKitModal);
const styles$2 = css`
  .icon-box {
    width: 64px;
    height: 64px;
    border-radius: ${({ borderRadius }) => borderRadius[5]};
    background-color: ${({ colors }) => colors.semanticError010};
  }
`;
var __decorate$2 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mUsageExceededView = class W3mUsageExceededView2 extends i {
  constructor() {
    super();
  }
  render() {
    return T`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="4"
        .padding="${["1", "3", "4", "3"]}"
      >
        <wui-flex justifyContent="center" alignItems="center" class="icon-box">
          <wui-icon size="xxl" color="error" name="warningCircle"></wui-icon>
        </wui-flex>

        <wui-text variant="lg-medium" color="primary" align="center">
          The app isn't responding as expected
        </wui-text>
        <wui-text variant="md-regular" color="secondary" align="center">
          Try again or reach out to the app team for help.
        </wui-text>

        <wui-button
          variant="neutral-secondary"
          size="md"
          @click=${this.onTryAgainClick.bind(this)}
          data-testid="w3m-usage-exceeded-button"
        >
          <wui-icon color="inherit" slot="iconLeft" name="refresh"></wui-icon>
          Try Again
        </wui-button>
      </wui-flex>
    `;
  }
  onTryAgainClick() {
    RouterController.goBack();
  }
};
W3mUsageExceededView.styles = styles$2;
W3mUsageExceededView = __decorate$2([
  customElement("w3m-usage-exceeded-view")
], W3mUsageExceededView);
const styles$1 = css`
  :host {
    width: 100%;
  }
`;
var __decorate$1 = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
let W3mListWallet = class W3mListWallet2 extends i {
  constructor() {
    super(...arguments);
    this.hasImpressionSent = false;
    this.walletImages = [];
    this.imageSrc = "";
    this.name = "";
    this.size = "md";
    this.tabIdx = void 0;
    this.disabled = false;
    this.showAllWallets = false;
    this.loading = false;
    this.loadingSpinnerColor = "accent-100";
    this.rdnsId = "";
    this.displayIndex = void 0;
    this.walletRank = void 0;
    this.namespaces = [];
  }
  connectedCallback() {
    super.connectedCallback();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.cleanupIntersectionObserver();
  }
  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has("name") || changedProperties.has("imageSrc") || changedProperties.has("walletRank")) {
      this.hasImpressionSent = false;
    }
    const hasWalletRankChanged = changedProperties.has("walletRank") && this.walletRank;
    if (hasWalletRankChanged && !this.intersectionObserver) {
      this.setupIntersectionObserver();
    }
  }
  setupIntersectionObserver() {
    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.loading && !this.hasImpressionSent) {
          this.sendImpressionEvent();
        }
      });
    }, { threshold: 0.1 });
    this.intersectionObserver.observe(this);
  }
  cleanupIntersectionObserver() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      this.intersectionObserver = void 0;
    }
  }
  sendImpressionEvent() {
    if (!this.name || this.hasImpressionSent || !this.walletRank) {
      return;
    }
    this.hasImpressionSent = true;
    if (this.rdnsId || this.name) {
      EventsController.sendWalletImpressionEvent({
        name: this.name,
        walletRank: this.walletRank,
        rdnsId: this.rdnsId,
        view: RouterController.state.view,
        displayIndex: this.displayIndex
      });
    }
  }
  handleGetWalletNamespaces() {
    const isMultiChain = Object.keys(AdapterController.state.adapters).length > 1;
    if (isMultiChain) {
      return this.namespaces;
    }
    return [];
  }
  render() {
    return T`
      <wui-list-wallet
        .walletImages=${this.walletImages}
        imageSrc=${o(this.imageSrc)}
        name=${this.name}
        size=${o(this.size)}
        tagLabel=${o(this.tagLabel)}
        .tagVariant=${this.tagVariant}
        .walletIcon=${this.walletIcon}
        .tabIdx=${this.tabIdx}
        .disabled=${this.disabled}
        .showAllWallets=${this.showAllWallets}
        .loading=${this.loading}
        loadingSpinnerColor=${this.loadingSpinnerColor}
        .namespaces=${this.handleGetWalletNamespaces()}
      ></wui-list-wallet>
    `;
  }
};
W3mListWallet.styles = styles$1;
__decorate$1([
  n({ type: Array })
], W3mListWallet.prototype, "walletImages", void 0);
__decorate$1([
  n()
], W3mListWallet.prototype, "imageSrc", void 0);
__decorate$1([
  n()
], W3mListWallet.prototype, "name", void 0);
__decorate$1([
  n()
], W3mListWallet.prototype, "size", void 0);
__decorate$1([
  n()
], W3mListWallet.prototype, "tagLabel", void 0);
__decorate$1([
  n()
], W3mListWallet.prototype, "tagVariant", void 0);
__decorate$1([
  n()
], W3mListWallet.prototype, "walletIcon", void 0);
__decorate$1([
  n()
], W3mListWallet.prototype, "tabIdx", void 0);
__decorate$1([
  n({ type: Boolean })
], W3mListWallet.prototype, "disabled", void 0);
__decorate$1([
  n({ type: Boolean })
], W3mListWallet.prototype, "showAllWallets", void 0);
__decorate$1([
  n({ type: Boolean })
], W3mListWallet.prototype, "loading", void 0);
__decorate$1([
  n({ type: String })
], W3mListWallet.prototype, "loadingSpinnerColor", void 0);
__decorate$1([
  n()
], W3mListWallet.prototype, "rdnsId", void 0);
__decorate$1([
  n()
], W3mListWallet.prototype, "displayIndex", void 0);
__decorate$1([
  n()
], W3mListWallet.prototype, "walletRank", void 0);
__decorate$1([
  n({ type: Array })
], W3mListWallet.prototype, "namespaces", void 0);
W3mListWallet = __decorate$1([
  customElement("w3m-list-wallet")
], W3mListWallet);
const styles = css`
  :host {
    --local-duration-height: 0s;
    --local-duration: ${({ durations }) => durations["lg"]};
    --local-transition: ${({ easings }) => easings["ease-out-power-2"]};
  }

  .container {
    display: block;
    overflow: hidden;
    overflow: hidden;
    position: relative;
    height: var(--local-container-height);
    transition: height var(--local-duration-height) var(--local-transition);
    will-change: height, padding-bottom;
  }

  .container[data-mobile-fullscreen='true'] {
    overflow: scroll;
  }

  .page {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: auto;
    width: inherit;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    background-color: ${({ tokens }) => tokens.theme.backgroundPrimary};
    border-bottom-left-radius: var(--local-border-bottom-radius);
    border-bottom-right-radius: var(--local-border-bottom-radius);
    transition: border-bottom-left-radius var(--local-duration) var(--local-transition);
  }

  .page[data-mobile-fullscreen='true'] {
    height: 100%;
  }

  .page-content {
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }

  .footer {
    height: var(--apkt-footer-height);
  }

  div.page[view-direction^='prev-'] .page-content {
    animation:
      slide-left-out var(--local-duration) forwards var(--local-transition),
      slide-left-in var(--local-duration) forwards var(--local-transition);
    animation-delay: 0ms, var(--local-duration, ${({ durations }) => durations["lg"]});
  }

  div.page[view-direction^='next-'] .page-content {
    animation:
      slide-right-out var(--local-duration) forwards var(--local-transition),
      slide-right-in var(--local-duration) forwards var(--local-transition);
    animation-delay: 0ms, var(--local-duration, ${({ durations }) => durations["lg"]});
  }

  @keyframes slide-left-out {
    from {
      transform: translateX(0px) scale(1);
      opacity: 1;
      filter: blur(0px);
    }
    to {
      transform: translateX(8px) scale(0.99);
      opacity: 0;
      filter: blur(4px);
    }
  }

  @keyframes slide-left-in {
    from {
      transform: translateX(-8px) scale(0.99);
      opacity: 0;
      filter: blur(4px);
    }
    to {
      transform: translateX(0) translateY(0) scale(1);
      opacity: 1;
      filter: blur(0px);
    }
  }

  @keyframes slide-right-out {
    from {
      transform: translateX(0px) scale(1);
      opacity: 1;
      filter: blur(0px);
    }
    to {
      transform: translateX(-8px) scale(0.99);
      opacity: 0;
      filter: blur(4px);
    }
  }

  @keyframes slide-right-in {
    from {
      transform: translateX(8px) scale(0.99);
      opacity: 0;
      filter: blur(4px);
    }
    to {
      transform: translateX(0) translateY(0) scale(1);
      opacity: 1;
      filter: blur(0px);
    }
  }
`;
var __decorate = function(decorators, target, key, desc) {
  var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
  else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
  return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
};
const HEADER_HEIGHT = 60;
let W3mRouterContainer = class W3mRouterContainer2 extends i {
  constructor() {
    super(...arguments);
    this.resizeObserver = void 0;
    this.transitionDuration = "0.15s";
    this.transitionFunction = "";
    this.history = "";
    this.view = "";
    this.setView = void 0;
    this.viewDirection = "";
    this.historyState = "";
    this.previousHeight = "0px";
    this.mobileFullScreen = OptionsController.state.enableMobileFullScreen;
    this.onViewportResize = () => {
      this.updateContainerHeight();
    };
  }
  updated(changedProps) {
    if (changedProps.has("history")) {
      const newHistory = this.history;
      if (this.historyState !== "" && this.historyState !== newHistory) {
        this.onViewChange(newHistory);
      }
    }
    if (changedProps.has("transitionDuration")) {
      this.style.setProperty("--local-duration", this.transitionDuration);
    }
    if (changedProps.has("transitionFunction")) {
      this.style.setProperty("--local-transition", this.transitionFunction);
    }
  }
  firstUpdated() {
    if (this.transitionFunction) {
      this.style.setProperty("--local-transition", this.transitionFunction);
    }
    this.style.setProperty("--local-duration", this.transitionDuration);
    this.historyState = this.history;
    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === this.getWrapper()) {
          let newHeight = entry.contentRect.height;
          const footerHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--apkt-footer-height") || "0");
          if (this.mobileFullScreen) {
            const viewportHeight = window.visualViewport?.height || window.innerHeight;
            const headerHeight = this.getHeaderHeight();
            newHeight = viewportHeight - headerHeight - footerHeight;
            this.style.setProperty("--local-border-bottom-radius", "0px");
          } else {
            const totalHeight = newHeight + footerHeight;
            newHeight = totalHeight;
            this.style.setProperty("--local-border-bottom-radius", footerHeight ? "var(--apkt-borderRadius-5)" : "0px");
          }
          this.style.setProperty("--local-container-height", `${newHeight}px`);
          if (this.previousHeight !== "0px") {
            this.style.setProperty("--local-duration-height", this.transitionDuration);
          }
          this.previousHeight = `${newHeight}px`;
        }
      }
    });
    this.resizeObserver.observe(this.getWrapper());
    this.updateContainerHeight();
    window.addEventListener("resize", this.onViewportResize);
    window.visualViewport?.addEventListener("resize", this.onViewportResize);
  }
  disconnectedCallback() {
    const wrapper = this.getWrapper();
    if (wrapper && this.resizeObserver) {
      this.resizeObserver.unobserve(wrapper);
    }
    window.removeEventListener("resize", this.onViewportResize);
    window.visualViewport?.removeEventListener("resize", this.onViewportResize);
  }
  render() {
    return T`
      <div class="container" data-mobile-fullscreen="${o(this.mobileFullScreen)}">
        <div
          class="page"
          data-mobile-fullscreen="${o(this.mobileFullScreen)}"
          view-direction="${this.viewDirection}"
        >
          <div class="page-content">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
  onViewChange(history) {
    const historyArr = history.split(",").filter(Boolean);
    const prevArr = this.historyState.split(",").filter(Boolean);
    const prevLength = prevArr.length;
    const newLength = historyArr.length;
    const newView = historyArr[historyArr.length - 1] || "";
    const duration = UiHelperUtil.cssDurationToNumber(this.transitionDuration);
    let direction = "";
    if (newLength > prevLength) {
      direction = "next";
    } else if (newLength < prevLength) {
      direction = "prev";
    } else if (newLength === prevLength && historyArr[newLength - 1] !== prevArr[prevLength - 1]) {
      direction = "next";
    }
    queueMicrotask(() => {
      this.viewDirection = `${direction}-${newView}`;
    });
    setTimeout(() => {
      this.historyState = history;
      this.setView?.(newView);
    }, duration);
    setTimeout(() => {
      this.viewDirection = "";
    }, duration * 2);
  }
  getWrapper() {
    return this.shadowRoot?.querySelector("div.page");
  }
  updateContainerHeight() {
    const wrapper = this.getWrapper();
    if (!wrapper) {
      return;
    }
    const footerHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--apkt-footer-height") || "0");
    let newHeight = 0;
    if (this.mobileFullScreen) {
      const viewportHeight = window.visualViewport?.height || window.innerHeight;
      const headerHeight = this.getHeaderHeight();
      newHeight = viewportHeight - headerHeight - footerHeight;
      this.style.setProperty("--local-border-bottom-radius", "0px");
    } else {
      newHeight = wrapper.getBoundingClientRect().height + footerHeight;
      this.style.setProperty("--local-border-bottom-radius", footerHeight ? "var(--apkt-borderRadius-5)" : "0px");
    }
    this.style.setProperty("--local-container-height", `${newHeight}px`);
    if (this.previousHeight !== "0px") {
      this.style.setProperty("--local-duration-height", this.transitionDuration);
    }
    this.previousHeight = `${newHeight}px`;
  }
  getHeaderHeight() {
    return HEADER_HEIGHT;
  }
};
W3mRouterContainer.styles = [styles];
__decorate([
  n({ type: String })
], W3mRouterContainer.prototype, "transitionDuration", void 0);
__decorate([
  n({ type: String })
], W3mRouterContainer.prototype, "transitionFunction", void 0);
__decorate([
  n({ type: String })
], W3mRouterContainer.prototype, "history", void 0);
__decorate([
  n({ type: String })
], W3mRouterContainer.prototype, "view", void 0);
__decorate([
  n({ attribute: false })
], W3mRouterContainer.prototype, "setView", void 0);
__decorate([
  r()
], W3mRouterContainer.prototype, "viewDirection", void 0);
__decorate([
  r()
], W3mRouterContainer.prototype, "historyState", void 0);
__decorate([
  r()
], W3mRouterContainer.prototype, "previousHeight", void 0);
__decorate([
  r()
], W3mRouterContainer.prototype, "mobileFullScreen", void 0);
W3mRouterContainer = __decorate([
  customElement("w3m-router-container")
], W3mRouterContainer);
const w3mModal = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get AppKitModal() {
    return AppKitModal;
  },
  get W3mListWallet() {
    return W3mListWallet;
  },
  get W3mModal() {
    return W3mModal;
  },
  W3mModalBase,
  get W3mRouterContainer() {
    return W3mRouterContainer;
  },
  get W3mUsageExceededView() {
    return W3mUsageExceededView;
  }
});
export {
  AppKitButton as A,
  AppKitNetworkButton as a,
  AppKitConnectButton as b,
  AppKitAccountButton as c,
  email as d,
  embeddedWallet as e,
  swaps as f,
  send as g,
  dataCapture as h,
  index as i,
  onramp as o,
  payWithExchange as p,
  receive as r,
  socials as s,
  transactions as t,
  w3mModal as w
};
