function digitaldataexchange(pid, cid, search_Value, resultCount, attribute1,langcode) {   
    var attributes = attribute1.split('-_-'); 

            digitalData = { 
                page: { 
                    pageInfo: { 
                        pageID: pid, 
                        onsiteSearchTerm: search_Value, 
                        onsiteSearchResults: resultCount 
                    }, 
                    category: { 
                        primaryCategory: cid 
                    }, 
                    attributes: { 
                        exploreAttributes: attribute1, 
                        extraFields: '', 
                        navOwner: attributes[0], 
                        contentOwner: attributes[1], 
                        countryID: attributes[2], 
                        language: attributes[3], 
                        productSeriesName: attributes[4], 
                        partNo: attributes[5], 
                        source: 'online' 
                    } 
                }, 
                pageInstanceID: 'language=' + langcode.toLowerCase() + '&primaryCategory=' + cid + '&navOwner=' + attributes[0] + '&contentOwner=' + attributes[1] + '&countryID=' + attributes[2] + '&site=parker.com' 
            }; 

} 
