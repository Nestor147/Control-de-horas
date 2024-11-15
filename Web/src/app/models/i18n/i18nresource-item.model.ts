export type Region = "de-DE" | "en-GB" | "en-US" | "es-AR" | "es-ES" |  "es-MX" |"fr-CA"| "fr-FR" | "pt-BR" |"pt-PT";

export interface I18NResourceItem {
    idIResourceItem: number ;
    resourceGroup:   ResourceGroup ;
    resourceName:    string;
    resourceValue:   ResourceValue;
    isTranslated:    boolean;
    regionCode:      RegionCode;
    resourceFullName?:string;

}

export enum RegionCode {
    DeDE = "de-DE",
    EnGB = "en-GB",
    EnUS = "en-US",
    EsAR = "es-AR",
    EsES = "es-ES",
    EsMX = "es-MX",
    FrCA = "fr-CA",
    FrFR = "fr-FR",
    PtBR = "pt-BR",
    PtPT = "pt-PT",
}

export enum ResourceGroup {
    ResourceGroupDefault="RESOURCE_GROUP_DEFAULT",
    CommonButtons = "COMMON_BUTTONS",
    CommonDatapager = "COMMON_DATAPAGER",
    CommonFooter = "COMMON_FOOTER",
    ErrorMessages = "ERROR_MESSAGES",
    FormLabels = "FORM_LABELS",
    MenuItems = "MENU_ITEMS",
    Messages = "MESSAGES",
    Navigation = "NAVIGATION",
    Titles = "TITLES",
}

export enum ResourceName {
    ResourceNameDefault="RESOURCE_NAME_DEFAULT",
    AboutUs = "ABOUT_US",
    ContactUs = "CONTACT_US",
    Copyright = "COPYRIGHT",
    FirstName = "FIRST_NAME",
    Home = "HOME",
    InvalidEmail = "INVALID_EMAIL",
    LongRowsLabel = "LONG_ROWS_LABEL",
    Submit = "SUBMIT",
    ThankYou = "THANK_YOU",
    Welcome = "WELCOME",
}

export enum ResourceValue {
    ResourceValueDefault="RESOURCE_VALUE_DEFAULT",
    AboutUs = "About Us",
    Bienvenue = "Bienvenue!",
    Contáctenos = "Contáctenos",
    ElCorreoElectrónicoProporcionadoNoEsVálido = "El correo electrónico proporcionado no es válido",
    Enviar = "Enviar",
    GraciasPorSuVisita = "¡Gracias por su visita!",
    Inicio = "Inicio",
    LíneaPorPágina = "Línea por página",
    Nombre = "Nombre",
    The2024TodosLosDerechosReservados = "© 2024 Todos los derechos reservados",
}
