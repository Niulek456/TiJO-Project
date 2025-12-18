# Testowanie i Jakość Oprogramowania

## Autor
**Imię i Nazwisko:** Natalia Maroszek

## Temat projektu
**KeyNest** – Aplikacja mobilna do wynajmu i zarządzania nieruchomościami.

## Opis projektu
KeyNest to aplikacja mobilna stworzona w technologii React Native, umożliwiająca użytkownikom przeglądanie ofert wynajmu nieruchomości. System pozwala na filtrowanie ofert (np. Domy, Apartamenty), przeglądanie szczegółów oraz bezpieczne logowanie do konta użytkownika. Aplikacja komunikuje się z backendem opartym na Appwrite.

Kluczowe funkcjonalności:
* Autentykacja użytkowników (Logowanie).
* Dynamiczna lista ofert pobierana z bazy danych.
* Filtrowanie nieruchomości po kategoriach.
* Nawigacja między ekranami.

## Uruchomienie projektu
Aby uruchomić projekt na lokalnym środowisku, należy wykonać poniższe komendy w terminalu:

1.  **Instalacja zależności:**
    ```bash
    npm install --legacy-peer-deps
    ```
2.  **Uruchomienie aplikacji (Metro Bundler):**
    ```bash
    npx expo start
    ```
3.  **Uruchomienie testów automatycznych:**
    ```bash
    npm test
    ```

## Testy
W projekcie zaimplementowano testy automatyczne z wykorzystaniem frameworka **Jest** oraz **React Native Testing Library**.

### 1. Testy Jednostkowe (Unit Tests)
Lokalizacja: `__tests__/UnitTests.test.tsx`
Testy te weryfikują działanie pojedynczych komponentów w izolacji:
* **AuthContext:** Sprawdza logikę zarządzania stanem sesji (domyślny stan wylogowania, zmiana na zalogowany).
* **CardItem:** Weryfikuje poprawne wyświetlanie danych nieruchomości (ceny z walutą, adresu, oceny).
* **Filters:** Testuje renderowanie kategorii filtrów i reakcję na kliknięcie.

### 2. Testy Integracyjne (Integration Tests)
Lokalizacja: `__tests__/IntegrationTests.test.tsx`
Testy te sprawdzają współpracę między modułami oraz przepływ danych (Data Flow):
* **Logowanie:** Symulacja procesu logowania (Formularz -> Mock API -> Alert sukcesu/błędu).
* **Ekran Główny:** Weryfikacja pobierania danych z mockowanej bazy Appwrite i wyświetlania ich na liście.
* **Nawigacja:** Sprawdzenie przejścia do ekranu szczegółów po kliknięciu w ofertę.

## Dokumentacja API
Aplikacja korzysta z backendu **Appwrite**. W testach wykorzystywane są mocki (atrapy) następujących serwisów:

* **Account (Użytkownicy):**
    * `createEmailPasswordSession(email, password)` – tworzenie sesji.
    * `deleteSessions()` – wylogowanie.
* **Databases (Baza Danych):**
    * `listDocuments(databaseId, collectionId)` – pobieranie listy nieruchomości.
    * Kolekcja **Properties** zawiera pola: `name`, `address`, `price`, `rating`, `image`, `type`.

## Przypadki testowe dla testera manualnego (TestCase)

| ID | Tytuł przypadku | Warunki wstępne | Kroki testowe | Oczekiwany rezultat |
| :--- | :--- | :--- | :--- | :--- |
| **TC01** | Poprawne logowanie | Użytkownik na ekranie Login. | 1. Wpisz poprawny email.<br>2. Wpisz poprawne hasło.<br>3. Kliknij "Zaloguj". | Komunikat "Sukces", przekierowanie na Home. |
| **TC02** | Błędne hasło | Użytkownik na ekranie Login. | 1. Wpisz poprawny email.<br>2. Wpisz błędne hasło.<br>3. Kliknij "Zaloguj". | Alert z błędem "Invalid credentials". |
| **TC03** | Puste pola logowania | Użytkownik na ekranie Login. | 1. Zostaw pola puste.<br>2. Kliknij "Zaloguj". | Alert "Wprowadź email i hasło". |
| **TC04** | Maskowanie hasła | Użytkownik na ekranie Login. | 1. Wpisz tekst w pole hasła. | Znaki są ukryte (kropki/gwiazdki). |
| **TC05** | Wyświetlanie listy | Użytkownik zalogowany. | 1. Przejdź na ekran Home.<br>2. Poczekaj na załadowanie. | Lista ofert jest widoczna. |
| **TC06** | Filtr "Domy" | Użytkownik na ekranie Home. | 1. Kliknij filtr "Domy". | Lista pokazuje tylko oferty typu "House". |
| **TC07** | Filtr "Apartamenty" | Użytkownik na ekranie Home. | 1. Kliknij filtr "Apartamenty". | Lista pokazuje tylko oferty typu "Apartment". |
| **TC08** | Sekcja Wyróżnione | Użytkownik na ekranie Home. | 1. Sprawdź nagłówek listy. | Widoczny tytuł "Wyróżnione". |
| **TC09** | Szczegóły oferty | Lista załadowana. | 1. Kliknij w wybraną ofertę. | Przejście do ekranu szczegółów. |
| **TC10** | Format ceny | Lista załadowana. | 1. Sprawdź cenę na karcie. | Cena zawiera walutę "PLN". |

## Technologie użyte w projekcie
* **Język programowania:** TypeScript
* **Framework:** React Native (Expo SDK 53)
* **Backend:** Appwrite
* **Testy:** Jest, React Native Testing Library
* **Nawigacja:** React Navigation