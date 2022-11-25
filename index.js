(function () {
  'use strict';

  const enviar = document.querySelector('#enviar');
  const modal = document.querySelector('#modal');

  const data = {
    Medico: {
      Nome: 'Luis Fernando Morais',
      Documento: '04294686103',
      ReferenciaExterna: 'ABC1234',
      TelefoneCelular: '61981297516',
      Email: 'luismqdf@hotmail.com',
      CNS: 'CNS do médico',
      TipoDocumento: 'CPF',
      Especialidades: ['Clínica Geral', 'Cirurgia Geral'],
      RegistroProfissional: {
        Numero: '123456',
        Conselho: 'CRM',
        UF: 'DF',
      },
      Endereco: {
        Endereco1: 'Rua 5 chácara 278 lote 11',
        Endereco2: 'apto 103',
        Bairro: 'Vicente Pires',
        Cidade: 'Brasília',
        Estado: 'DF',
        CodigoPostal: '72006-140',
      },
    },
    Paciente: {
      ReferenciaExterna: 'ABC1235',
      Nome: 'Ingrid Lana Barboza',
      Nascimento: '1995-05-26',
      Sexo: 'F',
      Etnia: 'Parda',
      Documento: '05126898140',
      TelefoneCelular: '61981297516',
      Email: 'luismqdf@gmail.com',
      Endereco: {
        Endereco1: 'QNM 07 lote 02',
        Endereco2: 'casa 03',
        Bairro: 'Ceilândia',
        Cidade: 'Brasília',
        Estado: 'DF',
        CodigoPostal: '29142676',
      },
    },
    RegistroProntuarioEletronico: {
      ReferenciaExterna: '123456',
      TipoConsulta: 'Atendimento Presencial',
    },
    Estabelecimento: {
      Nome: 'Hospital da Konsist',
      Logo: 'https://idoso.club/wp-content/uploads/2019/08/generic-company-logo-png-7.png',
      Endereco: {
        Endereco1: 'STN conjunto M',
        Endereco2: 'sala 103',
        Bairro: 'Asa Norte',
        Cidade: 'Brasília',
        Estado: 'DF',
        CodigoPostal: '70770909',
      },
    },
    ReferenciaExterna: '654321',
  };

  function POST_INICIAR(body) {
    return {
      url: 'https://emr-homolog.nexodata.com.br/api/prescricao/iniciar',
      options: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic a29uc2lzdDpCaGZTSjFwUENsRlE2RTRI',
        },
        body: JSON.stringify(body),
      },
    };
  }

  async function iniciar() {
    const { url, options } = POST_INICIAR(data);
    const response = await fetch(url, options);
    const json = await response.json();
    modal.removeAttribute('src');
    if (response.ok) {
      modal.setAttribute('src', json.ModalURL);
    }
    window.addEventListener(
      'message',
      (event) => {
        const validEvents = ['cancel', 'excluded', 'prescricao'];
        if (validEvents.includes(event.data.type)) {
          if (event.data.type === 'prescricao') {
            console.log('passamos');
          }
        }
      },
      false,
    );
  }

  enviar.addEventListener('click', iniciar());
})();
