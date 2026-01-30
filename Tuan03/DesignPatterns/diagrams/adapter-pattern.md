# Adapter Design Pattern - Class Diagram

## Sơ đồ UML Class Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           <<interface>>                                      │
│                            JsonService                                       │
│                            (Target)                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ + getJsonData(): object                                                      │
│ + processJsonData(data: object): object                                      │
│ + sendJsonData(data: object): boolean                                        │
└─────────────────────────────────────────────────────────────────────────────┘
                                    △
                                    │ implements
                                    │
              ┌─────────────────────┴─────────────────────┐
              │                                           │
┌─────────────┴───────────────────┐       ┌──────────────┴───────────────────┐
│       JsonWebService             │       │       XmlToJsonAdapter           │
│    (Concrete Target)             │       │         (Adapter)                │
├──────────────────────────────────┤       ├───────────────────────────────────┤
│ - data: object                   │       │ - xmlService: XmlService         │
├──────────────────────────────────┤       ├───────────────────────────────────┤
│ + getJsonData(): object          │       │ + getJsonData(): object          │
│ + processJsonData(data): object  │       │ + processJsonData(data): object  │
│ + sendJsonData(data): boolean    │       │ + xmlToJson(xml): object         │
│ + displayJson(data): void        │       │ + jsonToXml(json): string        │
└──────────────────────────────────┘       │ + processXmlAsJson(xml): object  │
                                           │ + sendXmlAsJson(xml): boolean    │
                                           └───────────────────────────────────┘
                                                           │
                                                           │ adapts
                                                           ▼
                                           ┌───────────────────────────────────┐
                                           │          XmlService               │
                                           │          (Adaptee)                │
                                           ├───────────────────────────────────┤
                                           │ - xmlData: string                 │
                                           ├───────────────────────────────────┤
                                           │ + getXmlData(): string            │
                                           │ + setXmlData(xml): void           │
                                           │ + processXmlData(xml): string     │
                                           │ + sendXmlData(xml): boolean       │
                                           │ + createUserXml(data): string     │
                                           │ + createProductXml(data): string  │
                                           │ + displayXml(xml): void           │
                                           └───────────────────────────────────┘
```

## System Context Diagram (C4 Model)

```
┌───────────────────────────────────────────────────────────────────────────┐
│                                                                           │
│                              Person                                       │
│                        ┌─────────────┐                                    │
│                        │   Client    │                                    │
│                        │(Ứng dụng   │                                    │
│                        │ khách)      │                                    │
│                        └─────┬───────┘                                    │
│                              │                                            │
│                              │ Gửi/Nhận dữ liệu                           │
│                              ▼                                            │
│                  ┌───────────────────────┐                                │
│                  │   Web Service System  │                                │
│                  │                       │                                │
│                  │  [Software System]    │                                │
│                  │                       │                                │
│                  │  Xử lý và chuyển đổi  │                                │
│                  │  dữ liệu giữa         │                                │
│                  │  XML và JSON          │                                │
│                  └───────────────────────┘                                │
│                                                                           │
└───────────────────────────────────────────────────────────────────────────┘
```

## Container Diagram

```
┌───────────────────────────────────────────────────────────────────────────┐
│                         Web Service System                                │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │                                                                     │  │
│  │  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐ │  │
│  │  │ Client App      │───▶│ Adapter Service │───▶│   XML Service   │ │  │
│  │  │ (cần JSON)      │    │                 │    │   (hệ thống cũ) │ │  │
│  │  │                 │    │ [Container:     │    │                 │ │  │
│  │  │ [Container:     │    │  Node.js Module]│    │ [Container:     │ │  │
│  │  │  Web App]       │◀───│                 │◀───│  Legacy System] │ │  │
│  │  │                 │    │ Chuyển đổi      │    │                 │ │  │
│  │  │ Sử dụng JSON    │    │ XML ↔ JSON      │    │ Chỉ hỗ trợ XML  │ │  │
│  │  └─────────────────┘    └─────────────────┘    └─────────────────┘ │  │
│  │                                                                     │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────────────────┘
```

## Component Diagram

```
┌───────────────────────────────────────────────────────────────────────────┐
│                         Adapter Service                                   │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │                                                                     │  │
│  │    ┌─────────────────────────────────────────────────────────┐     │  │
│  │    │                    <<interface>>                         │     │  │
│  │    │                     JsonService                          │     │  │
│  │    │                      (Target)                            │     │  │
│  │    │                                                          │     │  │
│  │    │  + getJsonData()                                         │     │  │
│  │    │  + processJsonData()                                     │     │  │
│  │    │  + sendJsonData()                                        │     │  │
│  │    └──────────────────────┬───────────────────────────────────┘     │  │
│  │                           │ implements                              │  │
│  │                           │                                         │  │
│  │    ┌──────────────────────▼───────────────────────────────────┐    │  │
│  │    │                  XmlToJsonAdapter                         │    │  │
│  │    │                     (Adapter)                             │    │  │
│  │    │                                                           │    │  │
│  │    │  + xmlToJson(xml): object                                 │    │  │
│  │    │  + jsonToXml(json): string                                │    │  │
│  │    │  + processXmlAsJson(xml): object                          │    │  │
│  │    └────────────────────────┬─────────────────────────────────┘    │  │
│  │                             │ uses                                  │  │
│  │                             ▼                                       │  │
│  │    ┌─────────────────────────────────────────────────────────┐     │  │
│  │    │                     XmlService                           │     │  │
│  │    │                     (Adaptee)                            │     │  │
│  │    │                                                          │     │  │
│  │    │  + getXmlData()                                          │     │  │
│  │    │  + processXmlData()                                      │     │  │
│  │    │  + sendXmlData()                                         │     │  │
│  │    │  Hệ thống cũ chỉ hỗ trợ XML                              │     │  │
│  │    └─────────────────────────────────────────────────────────┘     │  │
│  │                                                                     │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────────────────┘
```

## Sequence Diagram - XML to JSON Conversion

```
┌─────────┐         ┌───────────────────┐         ┌───────────────┐
│ Client  │         │ XmlToJsonAdapter  │         │  XmlService   │
└────┬────┘         └─────────┬─────────┘         └───────┬───────┘
     │                        │                           │
     │  processXmlAsJson(xml) │                           │
     │───────────────────────▶│                           │
     │                        │                           │
     │                        │    getXmlData()           │
     │                        │──────────────────────────▶│
     │                        │                           │
     │                        │◀──────────────────────────│
     │                        │    return xmlData         │
     │                        │                           │
     │                        │    xmlToJson(xmlData)     │
     │                        │────────────┐              │
     │                        │            │ Convert      │
     │                        │◀───────────┘              │
     │                        │                           │
     │                        │    processJsonData(json)  │
     │                        │────────────┐              │
     │                        │            │ Add metadata │
     │                        │◀───────────┘              │
     │                        │                           │
     │◀───────────────────────│                           │
     │    return processedJson│                           │
     ▼                        ▼                           ▼
```

## Luồng chuyển đổi dữ liệu

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   XML → JSON Flow:                                                          │
│   ┌──────────┐     ┌───────────────┐     ┌─────────────┐     ┌──────────┐  │
│   │   XML    │────▶│   Adapter     │────▶│   Parser    │────▶│   JSON   │  │
│   │   Data   │     │ (XmlToJson)   │     │  (Convert)  │     │   Data   │  │
│   └──────────┘     └───────────────┘     └─────────────┘     └──────────┘  │
│                                                                             │
│   JSON → XML Flow:                                                          │
│   ┌──────────┐     ┌───────────────┐     ┌─────────────┐     ┌──────────┐  │
│   │   JSON   │────▶│   Adapter     │────▶│ Serializer  │────▶│   XML    │  │
│   │   Data   │     │ (JsonToXml)   │     │  (Convert)  │     │   Data   │  │
│   └──────────┘     └───────────────┘     └─────────────┘     └──────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Ánh xạ Pattern vào Code

| Pattern Role  | Class Name        | Mục đích                                    |
|---------------|-------------------|---------------------------------------------|
| Target        | JsonService       | Interface mà client muốn sử dụng (JSON)     |
| ConcreteTarget| JsonWebService    | Dịch vụ web sử dụng JSON                    |
| Adaptee       | XmlService        | Hệ thống cũ chỉ hỗ trợ XML                  |
| Adapter       | XmlToJsonAdapter  | Chuyển đổi XML sang JSON                    |
| Adapter       | JsonToXmlAdapter  | Chuyển đổi JSON sang XML (ngược lại)        |
