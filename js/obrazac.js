document.addEventListener("DOMContentLoaded", function () {
  const forma = document.querySelector("form");

  forma.addEventListener("submit", function (event) {
    // Očisti prethodne poruke i oznake
    forma.querySelectorAll(".poruka-greske").forEach(el => el.remove());
    forma.querySelectorAll(".scrollano").forEach(el => el.classList.remove("scrollano"));
    forma.querySelectorAll(".neispravno").forEach(el => el.classList.remove("neispravno"));

    let ispravno = true;

    // === 1. Tekstualna polja: ime, prezime, email, lozinka ===
    const obaveznaPolja = ["ime", "prezime", "email", "lozinka"];
    obaveznaPolja.forEach(id => {
      const polje = document.getElementById(id);
      if (polje.value.trim() === "") {
        oznaciGresku(polje, "Polje je obavezno.");
        ispravno = false;
      }
    });

    // === 2. Radio gumbi: spol ===
    const spolovi = document.querySelectorAll('input[name="spol"]');
    if (![...spolovi].some(s => s.checked)) {
      const grupaSpol = document.getElementById("grupa-spol");
      oznaciGresku(grupaSpol, "Odaberite spol.");
      ispravno = false;
    }

    // === 3. Checkbox: AI alati ===
    const alati = document.querySelectorAll('input[name="alat[]"]');
    if (![...alati].some(c => c.checked)) {
      const grupaAlati = document.getElementById("grupa-alati");
      oznaciGresku(grupaAlati, "Odaberite barem jedan alat.");
      ispravno = false;
    }

    // === 4. Select: razina ===
    const razina = document.getElementById("razina");
    if (!razina.value) {
      oznaciGresku(razina, "Odaberite razinu znanja.");
      ispravno = false;
    }

    // === 5. Textarea: komentar ===
    const komentar = document.getElementById("komentar");
    const tekst = komentar.value.trim();

    const regexKomentar = /^(?=(?:.*http[s]?:\/\/.*\.(?:hr|com|org)))(?!.*[\$€])[A-Za-zČčĆćŽžŠšĐđ0-9\s\.,:;!?'"()\-@#\/\\]{200,1000}$/;

    if (!regexKomentar.test(tekst)) {
      oznaciGresku(komentar, "Komentar mora imati 200–1000 znakova.");
      ispravno = false;
    }

    if (!ispravno) {
      event.preventDefault();
    }
  });

  function oznaciGresku(element, poruka) {
    element.classList.add("neispravno");

    const greska = document.createElement("div");
    greska.className = "poruka-greske";
    greska.style.color = "red";
    greska.style.fontSize = "0.9em";
    greska.style.marginTop = "4px";
    greska.textContent = poruka;

    element.insertAdjacentElement("afterend", greska);

    // Automatski scroll do prve greške (ako već nije scrollano)
    if (!document.querySelector(".scrollano")) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      element.classList.add("scrollano");
    }
  }
});
