export interface ServiceItem {
  id: string;
  name: string;
  basePrice: number;
  category?: string;
}

export interface AddonItem {
  id: string;
  name: string;
  price: number;
  category?: string;
}

export interface EcommerceItem {
  item_id: string;
  item_name: string;
  item_category: string;
  price: number;
  quantity: number;
}

export interface QuoteData {
  selectedService: ServiceItem;
  services: AddonItem[];
  estimatedPrice: number;
  region: string;
  transactionId?: string;
}

export interface GtagEventParams {
  event_category?: string;
  event_label?: string;
  value?: number;
  currency?: string;
  transaction_id?: string;
  items?: EcommerceItem[];
  item_list_id?: string;
  item_list_name?: string;
  step_number?: number;
  service_type?: string;
  addons_count?: number;
  custom_parameter_1?: string;
  custom_parameter_2?: string;
  [key: string]: string | number | boolean | EcommerceItem[] | undefined;
}

export interface GtagConfig {
  page_path?: string;
  page_title?: string;
  page_location?: string;
  custom_map?: Record<string, string>;
  send_page_view?: boolean;
  client_id?: string;
}

export interface DataLayerEvent {
  event: string;
  [key: string]: string | number | boolean | object | undefined;
}

declare global {
  interface Window {
    gtag: (
      command: "config" | "event" | "js" | "set",
      targetId: string | Date,
      config?: GtagConfig | GtagEventParams
    ) => void;
    dataLayer: DataLayerEvent[];
  }
}

export {};
