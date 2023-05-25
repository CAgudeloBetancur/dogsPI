const validations = (elmName,errors,setErr,data) => {

  // ! Validate name

  if(elmName === "name") {

    let nameErrList = [
      "Only letters on the name",
      "name contains more than twenty characters",
      "name can not be empty"
    ]

    
    let nameFormat = /(^[a-zA-Z\s]*$)/.test(data.name);

    
    setErr({
      ...errors,
      name: [
        ...(!nameFormat ? [nameErrList[0]] : []),
        ...(data.name.length > 20 ? [nameErrList[1]] : []),
        ...(data.name.length <= 0 ? [nameErrList[2]] : [])
      ]
    })

  }

  // ! Validate height

  if(elmName === "minHeight" || elmName === 'maxHeight') {

    let heightErrList = [
      "Minimum height must to be minor than maximun height",
      "Height can not to be cero (0) or minor",
      "Maximum height must to be higher than minimum height"
    ]

    if(data.minHeight !== '' && data.maxHeight !== '') {
      setErr({
        ...errors,
        height: [
  
          ...(+data.minHeight <= 0 || +data.maxHeight <= 0 
            ? [heightErrList[1]] 
            : [] ),
  
          ...(+data.minHeight > +data.maxHeight 
            ? [
                heightErrList[0],
                heightErrList[2]
              ] 
            : []),
        ]
      })
    }

    if(data.minHeight !== '' && data.maxHeight === '') {
      setErr({
        ...errors,
        height: [
          ...(+data.minHeight <= 0 ? [heightErrList[1]] : [])
        ]
      })
    }

    if(data.minHeight === '' && data.maxHeight !== '') {
      setErr({
        ...errors,
        height: [
          ...(+data.maxHeight <= 0 ? [heightErrList[1]] : [])
        ]
      })
    }    

  } 

  // ! Validate weight
  
  if(elmName === "minWeight" || elmName === 'maxWeight') {

    let weightErrList = [
      "Minimum weight must to be minor than maximun weight",
      "Weight can not to be cero (0) or minor",
      "Maximum weight must to be higher than minimum weight"
    ]

    if(data.minWeight !== '' && data.maxWeight !== '') {
      setErr({
        ...errors,
        weight: [
  
          ...(+data.minWeight <= 0 || +data.maxWeight <= 0 
            ? [weightErrList[1]] 
            : [] ),
  
          ...(+data.minWeight > +data.maxWeight 
            ? [
                weightErrList[0],
                weightErrList[2]
              ] 
            : []),
        ]
      })
    }

    if(data.minWeight !== '' && data.maxWeight === '') {
      setErr({
        ...errors,
        weight: [
          ...(+data.minWeight <= 0 ? [weightErrList[1]] : [])
        ]
      })
    }

    if(data.minWeight === '' && data.maxWeight !== '') {
      setErr({
        ...errors,
        weight: [
          ...(+data.maxWeight <= 0 ? [weightErrList[1]] : [])
        ]
      })
    }    

  }

  // ! Validate Age

  if(elmName === "minAge" || elmName === 'maxAge') {

    let ageErrList = [
      "Minimum age must to be minor than maximun age",
      "Age can not to be cero (0) or minor",
      "Maximum age must to be higher than minimum age"
    ]

    if(data.minAge !== '' && data.maxAge !== '') {
      setErr({
        ...errors,
        age: [
  
          ...(+data.minAge <= 0 || +data.maxAge <= 0 
            ? [ageErrList[1]] 
            : [] ),
  
          ...(+data.minAge > +data.maxAge 
            ? [
                ageErrList[0],
                ageErrList[2]
              ] 
            : []),
          ]
      })
    }

    if(data.minAge !== '' && data.maxAge === '') {
      setErr({
        ...errors,
        age: [
          ...(+data.minAge <= 0 ? [ageErrList[1]] : [])
        ]
      })
    }

    if(data.minAge === '' && data.maxAge !== '') {
      setErr({
        ...errors,
        age: [
          ...(+data.maxWeight <= 0 ? [ageErrList[1]] : [])
        ]
      })
    }    

  }

}

export default validations;