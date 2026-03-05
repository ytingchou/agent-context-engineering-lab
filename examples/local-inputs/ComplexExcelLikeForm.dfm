object ComplexExcelLikeForm: TForm
  Caption = 'Complex Excel-Like Form'
  object pnlTop: TPanel
    Align = alTop
    Height = 48
    object btnQuery: TButton
      Caption = 'Query'
      Left = 8
      Top = 10
    end
    object btnSave: TButton
      Caption = 'Save'
      Left = 96
      Top = 10
    end
  end
  object grdMain: TStringGrid
    Align = alClient
    ColCount = 12
    RowCount = 200
    FixedRows = 1
  end
  object stbMain: TStatusBar
    Align = alBottom
  end
end
