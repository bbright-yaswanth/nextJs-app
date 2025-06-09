export class AppSettingsModel {
  id: string;
  showErrorsAtMobile: boolean;
  apiVersion: string;
  currency: string;
  refreshInterval: string;

  constructor({
    id,
    showErrorsAtMobile,
    apiVersion,
    currency,
    refreshInterval,
  }: {
    id: string;
    showErrorsAtMobile: boolean;
    apiVersion: string;
    currency: string;
    refreshInterval: string;
  }) {
    if (!id || !apiVersion || !currency || !refreshInterval) {
      throw new Error("Required fields must not be empty.");
    }

    this.id = id;
    this.showErrorsAtMobile = showErrorsAtMobile;
    this.apiVersion = apiVersion;
    this.currency = currency;
    this.refreshInterval = refreshInterval;
  }

  static fromMap(map: any): AppSettingsModel {
    return new AppSettingsModel({
      id: map.id,
      showErrorsAtMobile: map.show_errors_at_mobile,
      apiVersion: map.api_version,
      currency: map.currency,
      refreshInterval: map.refresh_interval,
    });
  }

  static emptyAppSettings(): AppSettingsModel {
    return new AppSettingsModel({
      id: '',
      showErrorsAtMobile: false,
      apiVersion: '',
      currency: '',
      refreshInterval: '',
    });
  }
}
