import React from 'react'
import { enrichDialog } from '../../../../gameItems/containers/dialog/helpers'
import { SpeakerLeft, SpeakerRight, Button } from '../../../../gameItems/components'

export const DIALOG_PATH_ID = 'template-level/start'

const _dialog = [
  {
    component: ({ dialog: { currentDialog }, isLastVisibleDialog, actions }) => {
      return (
        <>
          <SpeakerLeft text={`Let's generate a wallet for you ...`} />
        </>
      )
    }
  }
]

const enrichedDialog = enrichDialog(_dialog, DIALOG_PATH_ID)

export default enrichedDialog
