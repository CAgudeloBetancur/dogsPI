const logSignValidations = (elmName,errors,setErr,data) => {

  if(elmName === "name") {

    let errName = [
      "Name can not be emmpty",
      "Name must to contain thirty (30) characters or less"
    ]

    setErr({
      ...errors,
      name: [
        ...(data.name === '' ? [errName[0]] : []),
        ...(data.name.length > 30 ? [errName[1]] : [])
      ]
    })

  }

  if(elmName === "email") {

    let errEmail = [
      '"Email" no puede estar vacio',
      'Formato de correo no valido',
      '"Email" contiene más de 35 caracteres'];

    let emailFormat = /([a-zA-Z]+[0-9]*)@{1}([a-z]+[0-9]*)\.{1}[a-z]/.test(data.email);

    setErr({
      ...errors,
      email: [
        ...(data.email === '' ? [errEmail[0]] : []),
        ...(!emailFormat ? [errEmail[1]] : []),
        ...(data.email.length > 35 ? [errEmail[2]] : [])
      ]
    })

  } 
  
  if(elmName === "password") {

    let errPassword = [
      '"Password" no puede estar vacío',
      '"Password" debe contener un número',
      '"Password" debe tener entre 6 y 10 caracteres'
    ];

    const passwordFormat = /([a-zA-z]*[0-9]+)/.test(data.password);
    const lengthComp = !((data.password.length) < 6 ||(data.password.length) > 10) 

    setErr({
      ...errors,
      password: [
        ...(data.password === '' ? [errPassword[0]] : []),
        ...(!passwordFormat ? [errPassword[1]] : []),
        ...(!lengthComp ? [errPassword[2]] : [])
      ]
    })
  }

}

export default logSignValidations;