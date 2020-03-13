const { google } = require('googleapis');
// const slides = google.slides('v1');
// const drive = google.drive('v3');
const openurl = require('openurl');
const commaNumber = require('comma-number');
const _ = require('lodash');
var asyncLib = require('async');
const { IMAGES_ICON, MORALE_SCORES } = require('../config/common');

const SLIDE_TITLE_TEXT = 'Open Source Licenses Analysis';

/**
 * Get a single slide json request
 * @param {object} licenseData data about the license
 * @param {object} index the slide index
 * @return {object} The json for the Slides API
 * @example licenseData: {
 *            "licenseName": "mit",
 *            "percent": "12.5",
 *            "count": "1667029"
 *            license:"<body>"
 *          }
 * @example index: 3
 */
function createSlideJSON(licenseData, index) {
  // Then update the slides.
  const ID_TITLE_SLIDE = 'id_title_slide';
  const ID_TITLE_SLIDE_TITLE = 'id_title_slide_title';
  const ID_TITLE_SLIDE_BODY = 'id_title_slide_body';
  const ID_TABLE = 'id_table';

  return [{
    // Creates a "TITLE_AND_BODY" slide with objectId references
    createSlide: {
      objectId: `${ID_TITLE_SLIDE}_${index}`,
      slideLayoutReference: {
        predefinedLayout: 'BLANK'
      },
      insertionIndex: 0
    },
  }];
}

/**
 * Creates slides for our presentation.
 * @param {authAndGHData} An array with our Auth object and the GitHub data.
 * @return {Promise} A promise to return a new presentation.
 * @see https://developers.google.com/apis-explorer/#p/slides/v1/
 */
module.exports.createSlides = async (authAndGHData, body, dataScore) => {
  console.log('creating slides...', body);
  
  const [oauth2Client] = authAndGHData;
  const ghData = [{
                "title": "LEADERBOARD",
            }];
  const slides = google.slides({version: 'v1', auth: oauth2Client});

  let presentation = await slides.presentations.get({ presentationId: '1EB63RomkomwuLMyJxj0ol8MAv2nuumzkzkdda9OY9tM' });

  if(!presentation) {
    return {
      error: true,
      message: 'Not have presetation'
    }
  }

  const length = (presentation.data && presentation.data.slides) ? presentation.data.slides.length : 0;
  let promise = null;

  //check to create slide if exists or not
  if(length == 0) {
    const allSlides = ghData.map((data, index) => createSlideJSON(data, index + length));
    slideRequests = [].concat.apply([], allSlides); // flatten the slide requests
    slideRequests.push({
      replaceAllText: {
        replaceText: SLIDE_TITLE_TEXT,
        containsText: { text: '{{TITLE}}' }
      },
    })

    promise = await createData(slides, presentation, slideRequests);
  }

    //check if table exist or not
    if((presentation.data && presentation.data.slides && presentation.data.slides.length > 0 && presentation.data.slides[0].pageElements && presentation.data.slides[0].pageElements.length > 0 && presentation.data.slides[0].pageElements[0].table)) {

      let dataTable = presentation.data.slides[0].pageElements[0].table;
      let pageElements = presentation.data.slides[0].pageElements;
      //add row
      
      let formatCellGreen = {
        "rgbColor": {
          "red": 1.0,
          "green": 1.0,
          "blue": 1.0
        }
      };

      let formatCellBlue = {
        "rgbColor": {
          "red": 1.0,
          "green": 1.0,
          "blue": 1.0
        }
      };

      let textStyle = {
        "rgbColor": {
          "red": 0,
          "green": 0,
          "blue": 0
        }
      }
      let formatCellWhite = {
        "rgbColor": {
          "red": 1.0,
          "green": 1.0,
          "blue": 1.0
        }
      };

      if(dataScore.length == 1) {
        formatCellBlue = {
          "rgbColor": {
            "red": 0.203,
            "green": 0.658,
            "blue": 0.325
          }
        };
        formatCellGreen = {
          "rgbColor": {
            "red": 0.984,
            "green": 0.737,
            "blue": 0.02
          }
        }
        // formatCellGreen = {
        //   "rgbColor": {
        //     "red": 0.094,
        //     "green": 0.352,
        //     "blue": 0.737
        //   }
        // }
        textStyle = {
          "rgbColor": {
            "red": 1.0,
            "green": 1.0,
            "blue": 1.0
          }
        }
      }
      var requests = [];
      const dataScoreMorale = _.sortBy(dataScore, [function(o) { return o.highest_morale; }]).reverse();
      console.log('===========start promise ======', promise);

      asyncLib.waterfall([
        function deleteDataSlide(step) {
          console.log('=========Delete data slide=========');
          for(let i = 4; i <= pageElements.length; i++) {
            if(pageElements[i] && pageElements[i].image && pageElements[i].image && pageElements[i].image.sourceUrl) {
              console.log('=========Delete object id==========', (i-3));
              requests.push({
                "deleteObject": {
                  "objectId": `image_${i-3}`,
                }
              });
            }
          }

          // for(let i = 1; i < dataTable.rows; i++) {
          //   if(dataTable.tableRows[i] && dataTable.tableRows[i].tableCells && dataTable.tableRows[i].tableCells[0] && dataTable.tableRows[i].tableCells[0].text) {
          //     requests.push({
          //       "deleteText": {
          //         "objectId": "table_0",
          //         "cellLocation": {
          //           "rowIndex": i,
          //           "columnIndex": 0
          //         },
          //         "textRange": {
          //           "type": "ALL",
          //         }
          //       }
          //     });
          //   }

          //   if(dataTable.tableRows[i] && dataTable.tableRows[i].tableCells && dataTable.tableRows[i].tableCells[2] && dataTable.tableRows[i].tableCells[2].text) {
          //     requests.push({
          //       "deleteText": {
          //         "objectId": "table_0",
          //         "cellLocation": {
          //           "rowIndex": i,
          //           "columnIndex": 2
          //         },
          //         "textRange": {
          //           "type": "ALL",
          //         }
          //       }
          //     });
          //   }
          // }
          step();
        },
        // function deleteDataTextSlide(step) {
        //   for(let i = 1; i <= dataTable.rows; i++) {
        //     if(dataTable.tableRows[i] && dataTable.tableRows[i].tableCells && dataTable.tableRows[i].tableCells[0] && dataTable.tableRows[i].tableCells[0].text) {
        //       requests.push({
        //         "deleteText": {
        //           "objectId": "table_0",
        //           "cellLocation": {
        //             "rowIndex": i,
        //             "columnIndex": 0
        //           },
        //           "textRange": {
        //             "type": "ALL",
        //           }
        //         }
        //       });
        //     }

        //     if(dataTable.tableRows[i] && dataTable.tableRows[i].tableCells && dataTable.tableRows[i].tableCells[2] && dataTable.tableRows[i].tableCells[2].text) {
        //       requests.push({
        //         "deleteText": {
        //           "objectId": "table_0",
        //           "cellLocation": {
        //             "rowIndex": i,
        //             "columnIndex": 2
        //           },
        //           "textRange": {
        //             "type": "ALL",
        //           }
        //         }
        //       });
        //     }
        //   }
        //   step();
        // },
        function insertTexToSlide(step) {
          console.log('=========Insert Text=========');
          let translateY = 450575;
          for(var i = 1; i <= dataScore.length; i++) {
            //check to update text or create new row and insert 
            let highest_morale = (dataScoreMorale[i-1].highest_morale == 11 || dataScoreMorale[i-1].highest_morale == 12 ) ? 10 : dataScoreMorale[i-1].highest_morale;
            
            const dataImage = IMAGES_ICON[highest_morale];
              let emu4M = {
                magnitude: dataImage.size,
                unit: 'PT',
              };
              //Add Emoji
              requests.push({
                createImage: {
                  objectId: `image_${i}`,
                  url: dataImage.src,
                  elementProperties: {
                    pageObjectId: "id_title_slide_0",
                    size: {
                      height: emu4M,
                      width: emu4M,
                    },
                    transform: {
                      "scaleX": 1,
                      "scaleY": 1,
                      "translateX": 7072457,
                      // "translateY": 770575,
                      "translateY": translateY,
                      "unit": "EMU"
                    },
                  },
                },
              });
              translateY += 400000;


            if(i <= dataTable.rows - 1) {
              const dataInsert = [];
              
              if(dataTable.tableRows[i] && dataTable.tableRows[i].tableCells && dataTable.tableRows[i].tableCells[0] && dataTable.tableRows[i].tableCells[0].text) {
                dataInsert.push({
                  "deleteText": {
                    "objectId": "table_0",
                    "cellLocation": {
                      "rowIndex": i,
                      "columnIndex": 0
                    },
                    "textRange": {
                      "type": "ALL",
                    }
                  }
                });
              }

              dataInsert.push({
                "insertText": {
                  "objectId": "table_0",
                  "cellLocation": {
                    "rowIndex": i,
                    "columnIndex": 0
                  },
                  "text": `${capitalize(dataScore[i-1].group_name)} # ${dataScore[i-1].coins || 0}`,
                  "insertionIndex": 0
                }
              })
  
              if(dataTable.tableRows[i] && dataTable.tableRows[i].tableCells && dataTable.tableRows[i].tableCells[2] && dataTable.tableRows[i].tableCells[2].text) {
                dataInsert.push({
                  "deleteText": {
                    "objectId": "table_0",
                    "cellLocation": {
                      "rowIndex": i,
                      "columnIndex": 2
                    },
                    "textRange": {
                      "type": "ALL",
                    }
                  }
                });
              }

              dataInsert.push({
                "insertText": {
                  "objectId": "table_0",
                  "cellLocation": {
                    "rowIndex": i,
                    "columnIndex": 2
                  },
                  "text": `${capitalize(dataScoreMorale[i-1].group_name)}`,
                  "insertionIndex": 0
                }
              });
              //insert Highest morale
              requests.push(...dataInsert);
            } else {
              const dataInsertTableRow = [];
              dataInsertTableRow.push({
                "insertTableRows": {
                  "tableObjectId": "table_0",
                  "cellLocation": {
                    "rowIndex": dataTable.rows ? dataTable.rows - 1 : 1,
                  },
                  "insertBelow": true,
                  "number": 1
                }
              });
                
              if(dataTable.tableRows[i] && dataTable.tableRows[i].tableCells && dataTable.tableRows[i].tableCells[0] && dataTable.tableRows[i].tableCells[0].text) {
                dataInsertTableRow.push({
                  "deleteText": {
                    "objectId": "table_0",
                    "cellLocation": {
                      "rowIndex": i,
                      "columnIndex": 0
                    },
                    "textRange": {
                      "type": "ALL",
                    }
                  }
                });
              }
              dataInsertTableRow.push({
                  "insertText": {
                    "objectId": "table_0",
                    "cellLocation": {
                      "rowIndex": dataTable.rows ? dataTable.rows : 1,
                      "columnIndex": 0
                    },
                    "text": `${capitalize(dataScore[i-1].group_name)} # ${dataScore[i-1].coins || 0}`,
                    "insertionIndex": 0
                  }
              });

              if(dataTable.tableRows[i] && dataTable.tableRows[i].tableCells && dataTable.tableRows[i].tableCells[2] && dataTable.tableRows[i].tableCells[2].text) {
                dataInsertTableRow.push({
                  "deleteText": {
                    "objectId": "table_0",
                    "cellLocation": {
                      "rowIndex": i,
                      "columnIndex": 2
                    },
                    "textRange": {
                      "type": "ALL",
                    }
                  }
                });
              }
              dataInsertTableRow.push({
                //insert Highest morale
                "insertText": {
                  "objectId": "table_0",
                  "cellLocation": {
                    "rowIndex": dataTable.rows ? dataTable.rows : 1,
                    "columnIndex": 2
                  },
                  "text": `${capitalize(dataScoreMorale[i-1].group_name)}`,
                  "insertionIndex": 0
                }
              });

              requests.push(...dataInsertTableRow);
    
              requests.push({
                "updateTableCellProperties": {
                  "objectId": "table_0",
                  "tableRange": {
                    "location": {
                      "rowIndex": dataTable.rows ? dataTable.rows : 1,
                      "columnIndex": 0
                    },
                    "rowSpan": 1,
                    "columnSpan": 3
                  },
                  "tableCellProperties": {
                    "tableCellBackgroundFill": {
                      "solidFill": {
                        "color": formatCellGreen
                      }
                    }
                  },
                  "fields": "tableCellBackgroundFill.solidFill.color"
                },
              });
              
              requests.push({
                "updateTableBorderProperties": {
                  "objectId": "table_0",
                  "tableRange": {
                    "location": {
                      "rowIndex": dataTable.rows ? dataTable.rows : 1,
                      "columnIndex": 0
                    },
                    "rowSpan": 1,
                    "columnSpan": 3
                  },
                  "borderPosition": "OUTER",
                  "tableBorderProperties": {
                    "dashStyle": "SOLID",
                    "tableBorderFill": {
                      "solidFill": {
                        "color": {
                          "rgbColor": {
                            "red": 0.701,
                            "green": 0.701,
                            "blue": 0.701
                          }
                        }
                      }
                    }
                  },
                  "fields": "*"
                }
              })
    
              requests.push({
                "updateTableCellProperties": {
                  "objectId": "table_0",
                  "tableRange": {
                    "location": {
                      "rowIndex": dataTable.rows ? dataTable.rows : 1,
                      "columnIndex": 0
                    },
                    "rowSpan": 1,
                    "columnSpan": 2
                  },
                  "tableCellProperties": {
                    "tableCellBackgroundFill": {
                      "solidFill": {
                        "color": formatCellWhite
                      },
                    }
                  },
                  "fields": "tableCellBackgroundFill.solidFill.color"
                }
              });

              requests.push({
                "updateTableCellProperties": {
                  "objectId": "table_0",
                  "tableRange": {
                    "location": {
                      "rowIndex": dataTable.rows ? dataTable.rows : 1,
                      "columnIndex": 0
                    },
                    "rowSpan": 1,
                    "columnSpan": 1
                  },
                  "tableCellProperties": {
                    "tableCellBackgroundFill": {
                      "solidFill": {
                        "color": formatCellBlue
                      },
                    }
                  },
                  "fields": "tableCellBackgroundFill.solidFill.color"
                }
              });
    
              requests.push({
                "updateTextStyle": {
                  "objectId": "table_0",
                  "cellLocation": {
                    "rowIndex": dataTable.rows ? dataTable.rows : 1,
                    "columnIndex": 0
                  },
                  "style": {
                    "foregroundColor": {
                      "opaqueColor": textStyle
                    },
                    "bold": false,
                    "fontFamily": "Roboto",
                    "fontSize": {
                      "magnitude": 12,
                      "unit": "PT"
                    }
                  },
                  "textRange": {
                    "type": "ALL"
                  },
                  "fields": "foregroundColor,bold,fontFamily,fontSize"
                }
              });
    
              requests.push({
                "updateTextStyle": {
                  "objectId": "table_0",
                  "cellLocation": {
                    "rowIndex": dataTable.rows ? dataTable.rows : 1,
                    "columnIndex": 2
                  },
                  "style": {
                    "foregroundColor": {
                      "opaqueColor": textStyle
                    },
                    "bold": false,
                    "fontFamily": "Roboto",
                    "fontSize": {
                      "magnitude": 12,
                      "unit": "PT"
                    }
                  },
                  "textRange": {
                    "type": "ALL"
                  },
                  "fields": "foregroundColor,bold,fontFamily,fontSize"
                }
              });
            }
          } 
          console.log('=========End Insert text=========');
          step();
        },
        function createDataSlide(step) {
          console.log('=========Create data slide=========');
          createData(slides, presentation, requests);
        },
      ]);
      
      
    } else {
      var requests = [
        {
          "createTable": {
            "objectId": "table_0",
            "elementProperties": {
              "pageObjectId": "id_title_slide_0",
            },
            "rows": 2,
            "columns": 2
          }
        },
        {
          "insertText": {
            "objectId": 'table_0',
            "cellLocation": {
              "rowIndex": 0,
              "columnIndex": 0
            },
            "text": "MOST IMPACTFUL",
            "insertionIndex": 0
          }
        },
        {
          "insertText": {
            "objectId": 'table_0',
            "cellLocation": {
              "rowIndex": 0,
              "columnIndex": 2
            },
            "text": "HIGHEST MORALE",
            "insertionIndex": 0
          }
        },
        {
          "updateTableCellProperties": {
            "objectId": "table_0",
            "tableRange": {
              "location": {
                "rowIndex": 0,
                "columnIndex": 0
              },
              "rowSpan": 1,
              "columnSpan": 2
            },
            "tableCellProperties": {
              "tableCellBackgroundFill": {
                "solidFill": {
                  "color": {
                    "rgbColor": {
                      "red": 0.094,
                      "green": 0.352,
                      "blue": 0.737
                    }
                  }
                }
              }
            },
            "fields": "tableCellBackgroundFill.solidFill.color"
          }
        },
        {
          "updateTableCellProperties": {
            "objectId": "table_0",
            "tableRange": {
              "location": {
                "rowIndex": 0,
                "columnIndex": 0
              },
              "rowSpan": 1,
              "columnSpan": 1
            },
            "tableCellProperties": {
              "tableCellBackgroundFill": {
                "solidFill": {
                  "color": {
                    "rgbColor": {
                      "red": 0.203,
                      "green": 0.658,
                      "blue": 0.325
                    }
                  }
                }
              }
            },
            "fields": "tableCellBackgroundFill.solidFill.color"
          }
        },
        {
          "updateTextStyle": {
            "objectId": "table_0",
            "cellLocation": {
              "rowIndex": 0,
              "columnIndex": 0
            },
            "style": {
              "foregroundColor": {
                "opaqueColor": {
                  "rgbColor": {
                    "red": 1.0,
                    "green": 1.0,
                    "blue": 1.0
                  }
                }
              },
              "bold": true,
              "fontFamily": "Cambria",
              "fontSize": {
                "magnitude": 18,
                "unit": "PT"
              }
            },
            "textRange": {
              "type": "ALL"
            },
            "fields": "foregroundColor,bold,fontFamily,fontSize"
          }
        },
        {
          "updateTextStyle": {
            "objectId": "table_0",
            "cellLocation": {
              "rowIndex": 0,
              "columnIndex": 1
            },
            "style": {
              "foregroundColor": {
                "opaqueColor": {
                  "rgbColor": {
                    "red": 1.0,
                    "green": 1.0,
                    "blue": 1.0
                  }
                }
              },
              "bold": true,
              "fontFamily": "Cambria",
              "fontSize": {
                "magnitude": 18,
                "unit": "PT"
              }
            },
            "textRange": {
              "type": "ALL"
            },
            "fields": "foregroundColor,bold,fontFamily,fontSize"
          }
        },
      ];
      //create table
      if(promise) {
        const innerRequest = [
          {
            "insertText": {
              "objectId": 'table_0',
              "cellLocation": {
                "rowIndex": 1,
                "columnIndex": 0
              },
              "text": `${capitalize(body.group_name)} # ${body.coins || 0}`,
              "insertionIndex": 0
            }
          },
          {
            "insertText": {
              "objectId": 'table_0',
              "cellLocation": {
                "rowIndex": 1,
                "columnIndex": 2
              },
              "text": `${capitalize(body.group_name)} # ${body.highest_morale || 0}`,
              "insertionIndex": 0
            }
          },
        ];
        requests.push(...innerRequest);
        await createData(slides, presentation, requests);
      } else {
        await createData(slides, presentation, requests);
      }
    }
}

module.exports.generateSlides = (authAndGHData, dataScore) => new Promise((resolve, reject) => {
  
  const [oauth2Client] = authAndGHData;
  const ghData = [{
                "title": "LEADERBOARD",
            }];
  const slides = google.slides({version: 'v1', auth: oauth2Client});

  slides.presentations.get({
    presentationId: '1EB63RomkomwuLMyJxj0ol8MAv2nuumzkzkdda9OY9tM',
  }, (err, presentation) => {
    if (err) return reject(err);
    const slides = google.slides({version: 'v1', auth: oauth2Client});
    const length = (presentation.data && presentation.data.slides) ? presentation.data.slides.length : 0;
    let promise = null;

    //check to create slide if exists or not
    if(length == 0) {
      const allSlides = ghData.map((data, index) => createSlideJSON(data, index + length));
      slideRequests = [].concat.apply([], allSlides); // flatten the slide requests
      slideRequests.push({
        replaceAllText: {
          replaceText: SLIDE_TITLE_TEXT,
          containsText: { text: '{{TITLE}}' }
        },
      })
  
      promise = createData(slides, presentation, slideRequests);
    }

    //check if table exist or not
    if((dataScore && dataScore.length > 0) || (presentation.data && presentation.data.slides && presentation.data.slides.length > 0 && presentation.data.slides[0].pageElements && presentation.data.slides[0].pageElements.length > 0 && presentation.data.slides[0].pageElements[0].table)) {

      let dataTable = presentation.data.slides[0].pageElements[0].table;
      let pageElements = presentation.data.slides[0].pageElements;
      //add row
      
      let formatCellGreen = {
        "rgbColor": {
          "red": 1.0,
          "green": 1.0,
          "blue": 1.0
        }
      };

      let formatCellBlue = {
        "rgbColor": {
          "red": 1.0,
          "green": 1.0,
          "blue": 1.0
        }
      };

      let textStyle = {
        "rgbColor": {
          "red": 0,
          "green": 0,
          "blue": 0
        }
      }
      let formatCellWhite = {
        "rgbColor": {
          "red": 1.0,
          "green": 1.0,
          "blue": 1.0
        }
      };

      var requests = [];
      const dataScoreMorale = _.sortBy(dataScore, [function(o) { return o.highest_morale; }]).reverse();
      console.log('===========start promise ======', promise);

      asyncLib.waterfall([
        function deleteDataSlide(step) {
          console.log('=========Delete data slide=========');
          for(let i = 3; i <= pageElements.length; i++) {
            if(pageElements[i] && pageElements[i].image && pageElements[i].image && pageElements[i].image.sourceUrl) {
              requests.push({
                "deleteObject": {
                  "objectId": `image_${i-3}`,
                }
              });
            }
          }
          
          for(let i = 1; i < dataTable.rows; i++) {
            if(i < 2) {
              formatCellBlue = {
                "rgbColor": {
                  "red": 0.203,
                  "green": 0.658,
                  "blue": 0.325
                }
              };
              formatCellGreen = {
                "rgbColor": {
                  "red": 0.984,
                  "green": 0.737,
                  "blue": 0.02
                }
              }
              textStyle = {
                "rgbColor": {
                  "red": 1.0,
                  "green": 1.0,
                  "blue": 1.0
                }
              }
            }
            
            if(dataTable.tableRows[i] && dataTable.tableRows[i].tableCells && dataTable.tableRows[i].tableCells[0] && dataTable.tableRows[i].tableCells[0].text) {
              requests.push({
                "deleteText": {
                  "objectId": "table_0",
                  "cellLocation": {
                    "rowIndex": i,
                    "columnIndex": 0
                  },
                  "textRange": {
                    "type": "ALL",
                  }
                }
              });
            }

            if(dataTable.tableRows[i] && dataTable.tableRows[i].tableCells && dataTable.tableRows[i].tableCells[2] && dataTable.tableRows[i].tableCells[2].text) {
              requests.push({
                "deleteText": {
                  "objectId": "table_0",
                  "cellLocation": {
                    "rowIndex": i,
                    "columnIndex": 2
                  },
                  "textRange": {
                    "type": "ALL",
                  }
                }
              });
            }
          }
          step();
        },
        function insertTexToSlide(step) {
          console.log('=========Insert Text=========');
          let translateY = 450575;
          for(var i = 1; i <= dataScore.length; i++) {
            //check to update text or create new row and insert 
            let highest_morale = (dataScoreMorale[i-1].highest_morale == 11 || dataScoreMorale[i-1].highest_morale == 12 ) ? 10 : dataScoreMorale[i-1].highest_morale;
            
            const dataImage = IMAGES_ICON[highest_morale];
              let emu4M = {
                magnitude: dataImage.size,
                unit: 'PT',
              };
              //Add Emoji
              requests.push({
                createImage: {
                  objectId: `image_${i}`,
                  url: dataImage.src,
                  elementProperties: {
                    pageObjectId: "id_title_slide_0",
                    size: {
                      height: emu4M,
                      width: emu4M,
                    },
                    transform: {
                      "scaleX": 1,
                      "scaleY": 1,
                      "translateX": 7072457,
                      // "translateY": 770575,
                      "translateY": translateY,
                      "unit": "EMU"
                    },
                  },
                },
              });
              translateY += 400000;


            if(i <= dataTable.rows - 1) {
              const dataInsert = [
                {
                  "insertText": {
                    "objectId": "table_0",
                    "cellLocation": {
                      "rowIndex": i,
                      "columnIndex": 0
                    },
                    "text": `${capitalize(dataScore[i-1].group_name)} # ${dataScore[i-1].coins || 0}`,
                    "insertionIndex": 0
                  }
                },
                {
                  "insertText": {
                    "objectId": "table_0",
                    "cellLocation": {
                      "rowIndex": i,
                      "columnIndex": 2
                    },
                    "text": `${capitalize(dataScoreMorale[i-1].group_name)}`,
                    "insertionIndex": 0
                  }
                }
              ]
              //insert Highest morale
              requests.push(...dataInsert);
            } else {
              const dataInsertTableRow = [
                {
                  "insertTableRows": {
                    "tableObjectId": "table_0",
                    "cellLocation": {
                      "rowIndex": dataTable.rows ? dataTable.rows - 1 : 1,
                    },
                    "insertBelow": true,
                    "number": 1
                  }
                },
                {
                  "insertText": {
                    "objectId": "table_0",
                    "cellLocation": {
                      "rowIndex": dataTable.rows ? dataTable.rows : 1,
                      "columnIndex": 0
                    },
                    "text": `${capitalize(dataScore[i-1].group_name)} # ${dataScore[i-1].coins || 0}`,
                    "insertionIndex": 0
                  }
                },
                {
                  //insert Highest morale
                  "insertText": {
                    "objectId": "table_0",
                    "cellLocation": {
                      "rowIndex": dataTable.rows ? dataTable.rows : 1,
                      "columnIndex": 2
                    },
                    "text": `${capitalize(dataScoreMorale[i-1].group_name)}`,
                    "insertionIndex": 0
                  }
                }
              ]
              requests.push(...dataInsertTableRow);
    
              requests.push({
                "updateTableCellProperties": {
                  "objectId": "table_0",
                  "tableRange": {
                    "location": {
                      "rowIndex": dataTable.rows ? dataTable.rows : 1,
                      "columnIndex": 0
                    },
                    "rowSpan": 1,
                    "columnSpan": 3
                  },
                  "tableCellProperties": {
                    "tableCellBackgroundFill": {
                      "solidFill": {
                        "color": formatCellGreen
                      }
                    }
                  },
                  "fields": "tableCellBackgroundFill.solidFill.color"
                },
              });
              
              requests.push({
                "updateTableBorderProperties": {
                  "objectId": "table_0",
                  "tableRange": {
                    "location": {
                      "rowIndex": dataTable.rows ? dataTable.rows : 1,
                      "columnIndex": 0
                    },
                    "rowSpan": 1,
                    "columnSpan": 3
                  },
                  "borderPosition": "OUTER",
                  "tableBorderProperties": {
                    "dashStyle": "SOLID",
                    "tableBorderFill": {
                      "solidFill": {
                        "color": {
                          "rgbColor": {
                            "red": 0.701,
                            "green": 0.701,
                            "blue": 0.701
                          }
                        }
                      }
                    }
                  },
                  "fields": "*"
                }
              })
    
              requests.push({
                "updateTableCellProperties": {
                  "objectId": "table_0",
                  "tableRange": {
                    "location": {
                      "rowIndex": dataTable.rows ? dataTable.rows : 1,
                      "columnIndex": 0
                    },
                    "rowSpan": 1,
                    "columnSpan": 2
                  },
                  "tableCellProperties": {
                    "tableCellBackgroundFill": {
                      "solidFill": {
                        "color": formatCellWhite
                      },
                    }
                  },
                  "fields": "tableCellBackgroundFill.solidFill.color"
                }
              });

              requests.push({
                "updateTableCellProperties": {
                  "objectId": "table_0",
                  "tableRange": {
                    "location": {
                      "rowIndex": dataTable.rows ? dataTable.rows : 1,
                      "columnIndex": 0
                    },
                    "rowSpan": 1,
                    "columnSpan": 1
                  },
                  "tableCellProperties": {
                    "tableCellBackgroundFill": {
                      "solidFill": {
                        "color": formatCellBlue
                      },
                    }
                  },
                  "fields": "tableCellBackgroundFill.solidFill.color"
                }
              });
    
              requests.push({
                "updateTextStyle": {
                  "objectId": "table_0",
                  "cellLocation": {
                    "rowIndex": dataTable.rows ? dataTable.rows : 1,
                    "columnIndex": 0
                  },
                  "style": {
                    "foregroundColor": {
                      "opaqueColor": textStyle
                    },
                    "bold": false,
                    "fontFamily": "Roboto",
                    "fontSize": {
                      "magnitude": 12,
                      "unit": "PT"
                    }
                  },
                  "textRange": {
                    "type": "ALL"
                  },
                  "fields": "foregroundColor,bold,fontFamily,fontSize"
                }
              });
    
              requests.push({
                "updateTextStyle": {
                  "objectId": "table_0",
                  "cellLocation": {
                    "rowIndex": dataTable.rows ? dataTable.rows : 1,
                    "columnIndex": 2
                  },
                  "style": {
                    "foregroundColor": {
                      "opaqueColor": textStyle
                    },
                    "bold": false,
                    "fontFamily": "Roboto",
                    "fontSize": {
                      "magnitude": 12,
                      "unit": "PT"
                    }
                  },
                  "textRange": {
                    "type": "ALL"
                  },
                  "fields": "foregroundColor,bold,fontFamily,fontSize"
                }
              });
            }
          } 
          console.log('=========End Insert text=========');
          step();
        },
        function createDataSlide(step) {
          console.log('=========Create data slide=========');
          createData(slides, presentation, requests);
        },
      ]);
    }
  });
});

async function createData(slides, presentation, requests) {
    return await slides.presentations.batchUpdate({
      presentationId: presentation.data.presentationId,
      resource: {
        requests: requests
      }
    });
}

function handleDataImage(highest_morale) {
  
    let dataImage = null;
    let i = 1;
    asyncLib.each(MORALE_SCORES, function(item, callback) {
      if(item.min <= highest_morale && item.max >= highest_morale) {
        if(highest_morale <= 0) {
          dataImage = IMAGES_ICON[0];
        } else if(highest_morale === 1) {
          dataImage = IMAGES_ICON[1];
        } else if(highest_morale === 2) {
          dataImage = IMAGES_ICON[2];
        } else if(highest_morale === 3) {
          dataImage = IMAGES_ICON[3];
        } else if(highest_morale === 4) {
          dataImage = IMAGES_ICON[4];
        } else if(highest_morale === 5) {
          dataImage = IMAGES_ICON[5];
        } else if(highest_morale === 6) {
          dataImage = IMAGES_ICON[6];
        } else if(highest_morale === 7) {
          dataImage = IMAGES_ICON[7];
        } else if(highest_morale === 8) {
          dataImage = IMAGES_ICON[8];
        } else if(dataScore[i-1].highest_morale === 9) {
          dataImage = IMAGES_ICON[9];
        } else {
          dataImage = IMAGES_ICON[10];
        }
        i++;
      }
    });

    if(i == MORALE_SCORES.length) {
      callback(dataImage);
    }

    // MORALE_SCORES.map(async (item, index) => {
    //     if(item.min <= highest_morale && item.max >= highest_morale) {
    //       if(highest_morale <= 0) {
    //         dataImage = IMAGES_ICON[0];
    //       } else if(highest_morale === 1) {
    //         dataImage = IMAGES_ICON[1];
    //       } else if(highest_morale === 2) {
    //         dataImage = IMAGES_ICON[2];
    //       } else if(highest_morale === 3) {
    //         dataImage = IMAGES_ICON[3];
    //       } else if(highest_morale === 4) {
    //         dataImage = IMAGES_ICON[4];
    //       } else if(highest_morale === 5) {
    //         dataImage = IMAGES_ICON[5];
    //       } else if(highest_morale === 6) {
    //         dataImage = IMAGES_ICON[6];
    //       } else if(highest_morale === 7) {
    //         dataImage = IMAGES_ICON[7];
    //       } else if(highest_morale === 8) {
    //         dataImage = IMAGES_ICON[8];
    //       } else if(dataScore[i-1].highest_morale === 9) {
    //         dataImage = IMAGES_ICON[9];
    //       } else {
    //         dataImage = IMAGES_ICON[10];
    //       }
    //     }
    // });
}

function capitalize(s) {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}