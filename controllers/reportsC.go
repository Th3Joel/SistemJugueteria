package controllers

import (
	"Jugueteria/config"
	"Jugueteria/models"
	"Jugueteria/types"
	"time"

	"github.com/gofiber/fiber/v2"
)

type ReportsC struct{}

func (r ReportsC) InventoryReport(f *fiber.Ctx, RunnigOut bool) error {
	type Category struct {
		ID   string `json:"-"`
		Name string `json:"name"`
	}
	type modelResponse struct {
		CategoryID    string   `json:"-"`
		Code          string   `json:"code"`
		Description   string   `json:"description"`
		SalePrice     float64  `json:"sale_price"`
		PurchasePrice float64  `json:"purchase_price"`
		Stock         int      `json:"stock"`
		Category      Category `json:"category"`
		MinimunStock  int      `json:"min_stock"`
	}
	db := config.DB.Model(models.Articles{})
	model := []modelResponse{}
	if RunnigOut {
		db.Preload("Category").Where("stock <= minimun_stock").Find(&model)
	} else {
		db.Preload("Category").Find(&model)
	}

	return f.JSON(types.Response{
		Status: true,
		Find:   model,
	})

}

func (r ReportsC) SaleReport(f *fiber.Ctx) error {
	type Articles struct {
		ID          string  `json:"-"`
		Code        string  `json:"code"`
		Description string  `json:"description"`
		SalePrice   float64 `json:"price"`
	}
	type Costumers struct {
		ID   string `json:"-"`
		Name string `json:"name"`
	}

	type DetailSale struct {
		SaleID    string   `json:"-"`
		ArticleID string   `json:"-"`
		Quantity  int      `json:"quantity"`
		Subtotal  float64  `json:"subtotal"`
		Discount  float64  `json:"discount"`
		Article   Articles `json:"article"`
	}
	type Sale struct {
		ID            string    `json:"-"`
		CostumerID    string    `json:"-"`
		Code          string    `json:"code"`
		Total         float64   `json:"total"`
		Neto          float64   `json:"neto"`
		CashDollar    float64   `json:"cashDollar"`
		CashCordoba   float64   `json:"cashCordoba"`
		DiscountTotal float64   `json:"discountTotal"`
		Exchange      float64   `json:"exchange"`
		CreatedAt     time.Time `json:"date"`

		Costumer   Costumers    `json:"costumer"`
		DetailSale []DetailSale `json:"detail"`
	}
	code := f.Params("code")
	model := Sale{}
	db := config.DB.Model(models.Sales{})
	db.Preload("Costumer").Preload("DetailSale").Preload("DetailSale.Article").
		Where("code = ?", code).
		First(&model)
	if db.RowsAffected == 0 {
		return f.JSON(types.Response{
			Status: false,
			Msj:    "No se encontró la factura",
		})
	}

	return f.JSON(types.Response{
		Status: true,
		Find:   model,
	})

}

func (ReportsC) PurchaseReport(f *fiber.Ctx) error {
	type Suppliers struct {
		ID   string `json:"-"`
		Name string `json:"name"`
	}
	type ArticlesBox struct {
		ID            string  `json:"-"`
		Description   string  `json:"description"`
		PurchasePrice float64 `json:"purchasePrice"`
		ToysQuantity  int     `json:"toysQuantity"`
	}
	type Articles struct {
		ID          string `json:"-"`
		Code        string `json:"code"`
		Description string `json:"description"`
	}
	type DetailPurchase struct {
		PurchaseID string   `json:"-"`
		ArticleID  string   `json:"-"`
		Price      float64  `json:"price"`
		Quantity   int      `json:"quantity"`
		Subtotal   float64  `json:"subtotal"`
		Article    Articles `json:"article"`
	}
	type Purchase struct {
		ID           string    `json:"-"`
		SupplierID   string    `json:"-"`
		ArticleBoxID string    `json:"-"`
		Code         string    `json:"code"`
		Total        float64   `json:"total"`
		CreatedAt    time.Time `json:"date"`

		PurchaseDetail []DetailPurchase `json:"detail"`
		Supplier       Suppliers        `json:"supplier"`
		ArticleBox     ArticlesBox      `json:"articleBox"`
	}

	code := f.Params("code")
	model := Purchase{}
	db := config.DB.Model(models.Purchases{})
	db.Preload("Supplier").Preload("ArticleBox").Preload("PurchaseDetail").Preload("PurchaseDetail.Article").
		Where("code = ?", code).
		First(&model)
	if db.RowsAffected == 0 {
		return f.JSON(types.Response{
			Status: false,
			Msj:    "No se encontró la factura",
		})
	}

	return f.JSON(types.Response{
		Status: true,
		Find:   model,
	})

}

func (ReportsC) SuppliersReport(f *fiber.Ctx) error {
	type Suppliers struct {
		ID      string `json:"-"`
		Name    string `json:"Name"`
		Email   string `json:"Email"`
		Phone   string `json:"Phone"`
		Address string `json:"Address"`
	}
	db := config.DB.Model(models.Suppliers{})
	model := []Suppliers{}
	db.Find(&model)
	return f.JSON(types.Response{
		Status: true,
		Find:   model,
	})
}

func (ReportsC) CostumerReport(f *fiber.Ctx) error {
	type Costumers struct {
		ID    string `json:"-"`
		Name  string `json:"Name"`
		Phone string `json:"Phone"`
	}
	db := config.DB.Model(models.Costumers{})
	model := []Costumers{}
	db.Find(&model)
	return f.JSON(types.Response{
		Status: true,
		Find:   model,
	})
}

func (ReportsC) SalesReportPeriodic(f *fiber.Ctx) error {
	type Costumers struct {
		ID   string `json:"-"`
		Name string `json:"name"`
	}
	type User struct {
		ID   string `json:"-"`
		Name string `json:"name"`
	}

	type Sale struct {
		ID            string    `json:"-"`
		CostumerID    string    `json:"-"`
		UserId        string    `json:"-"`
		Code          string    `json:"code"`
		Total         float64   `json:"total"`
		Neto          float64   `json:"neto"`
		State         int       `json:"state"`
		CashDollar    float64   `json:"cashDollar"`
		CashCordoba   float64   `json:"cashCordoba"`
		DiscountTotal float64   `json:"discountTotal"`
		Exchange      float64   `json:"exchange"`
		CreatedAt     time.Time `json:"date"`

		User     User      `json:"user"`
		Costumer Costumers `json:"costumer"`
	}

	que := struct {
		StartDate string `param:"startDate"`
		EndDate   string `param:"endDate"`
		Filter    string `param:"filter"`
	}{}
	err := f.QueryParser(&que)
	if err != nil {
		return err
	}

	model := []Sale{}
	db := config.DB.Model(models.Sales{})
	db.
		Preload("Costumer").
		Preload("User")

	if que.StartDate != "" && que.EndDate != "" {
		db.Where("DATE(created_at) BETWEEN ? AND ?", que.StartDate, que.EndDate)
	} else if que.Filter == "day" {
		db.Where("DATE(created_at) = ?", time.Now().Format("2006-01-02"))
	} else if que.Filter == "week" {
		dateNow := time.Now().Format("2006-01-02")
		dateMinusOneWeek := time.Now().AddDate(0, 0, -7).Format("2006-01-02")
		db.Where("DATE(created_at) BETWEEN ? AND ?", dateMinusOneWeek, dateNow)
	} else if que.Filter == "month" {
		dateNow := time.Now().Format("2006-01-02")
		dateMinusOneMonth := time.Now().AddDate(0, -1, 0).Format("2006-01-02")
		db.Where("DATE(created_at) BETWEEN ? AND ?", dateMinusOneMonth, dateNow)
	} else if que.Filter == "year" {
		dateNow := time.Now().Format("2006-01-02")
		dateMinusOneYear := time.Now().AddDate(-1, 0, 0).Format("2006-01-02")
		db.Where("DATE(created_at) BETWEEN ? AND ?", dateMinusOneYear, dateNow)
	}

	db.Order("created_at DESC").Find(&model)
	if db.RowsAffected == 0 {
		return f.JSON(types.Response{
			Status: false,
			Msj:    "No se encontraron registros",
		})
	}

	return f.JSON(types.Response{
		Status: true,
		Find:   model,
	})
}

func (ReportsC) PurchasesReportPeriodic(f *fiber.Ctx) error {
	type Suppliers struct {
		ID   string `json:"-"`
		Name string `json:"name"`
	}

	type Purchase struct {
		ID           string    `json:"-"`
		SupplierID   string    `json:"-"`
		ArticleBoxID string    `json:"-"`
		State        int       `json:"state"`
		Code         string    `json:"code"`
		Total        float64   `json:"total"`
		CreatedAt    time.Time `json:"date"`

		Supplier   Suppliers   `json:"supplier"`
		ArticleBox ArticlesBox `json:"articleBox"`
	}

	que := struct {
		StartDate string `param:"startDate"`
		EndDate   string `param:"endDate"`
		Filter    string `param:"filter"`
	}{}
	err := f.QueryParser(&que)
	if err != nil {
		return err
	}

	model := []Purchase{}
	db := config.DB.Model(models.Purchases{})
	db.
		Preload("ArticleBox").
		Preload("Supplier")
	if que.StartDate != "" && que.EndDate != "" {
		db.Where("DATE(created_at) BETWEEN ? AND ?", que.StartDate, que.EndDate)
	} else if que.Filter == "day" {
		db.Where("DATE(created_at) = ?", time.Now().Format("2006-01-02"))
	} else if que.Filter == "week" {
		dateNow := time.Now().Format("2006-01-02")
		dateMinusOneWeek := time.Now().AddDate(0, 0, -7).Format("2006-01-02")
		db.Where("DATE(created_at) BETWEEN ? AND ?", dateMinusOneWeek, dateNow)
	} else if que.Filter == "month" {
		dateNow := time.Now().Format("2006-01-02")
		dateMinusOneMonth := time.Now().AddDate(0, -1, 0).Format("2006-01-02")
		db.Where("DATE(created_at) BETWEEN ? AND ?", dateMinusOneMonth, dateNow)
	} else if que.Filter == "year" {
		dateNow := time.Now().Format("2006-01-02")
		dateMinusOneYear := time.Now().AddDate(-1, 0, 0).Format("2006-01-02")
		db.Where("DATE(created_at) BETWEEN ? AND ?", dateMinusOneYear, dateNow)
	}

	db.Order("created_at DESC").Find(&model)
	if db.RowsAffected == 0 {
		return f.JSON(types.Response{
			Status: false,
			Msj:    "No se encontraron registros",
		})
	}

	return f.JSON(types.Response{
		Status: true,
		Find:   model,
	})
}

func (ReportsC) CashRegisterReportPeriodic(f *fiber.Ctx) error {
	que := struct {
		StartDate string `param:"startDate"`
		EndDate   string `param:"endDate"`
		Filter    string `param:"filter"`
	}{}
	err := f.QueryParser(&que)
	if err != nil {
		return err
	}

	model := []CashRegisterC{}
	db := config.DB.Model(models.CashRegister{})
	db.
		Preload("Users")
	if que.StartDate != "" && que.EndDate != "" {
		db.Where("DATE(created_at) BETWEEN ? AND ?", que.StartDate, que.EndDate)
	} else if que.Filter == "day" {
		db.Where("DATE(created_at) = ?", time.Now().Format("2006-01-02"))
	} else if que.Filter == "week" {
		dateNow := time.Now().Format("2006-01-02")
		dateMinusOneWeek := time.Now().AddDate(0, 0, -7).Format("2006-01-02")
		db.Where("DATE(created_at) BETWEEN ? AND ?", dateMinusOneWeek, dateNow)
	} else if que.Filter == "month" {
		dateNow := time.Now().Format("2006-01-02")
		dateMinusOneMonth := time.Now().AddDate(0, -1, 0).Format("2006-01-02")
		db.Where("DATE(created_at) BETWEEN ? AND ?", dateMinusOneMonth, dateNow)
	} else if que.Filter == "year" {
		dateNow := time.Now().Format("2006-01-02")
		dateMinusOneYear := time.Now().AddDate(-1, 0, 0).Format("2006-01-02")
		db.Where("DATE(created_at) BETWEEN ? AND ?", dateMinusOneYear, dateNow)
	}

	db.Order("created_at DESC").Find(&model)
	if db.RowsAffected == 0 {
		return f.JSON(types.Response{
			Status: false,
			Msj:    "No se encontraron registros",
		})
	}

	return f.JSON(types.Response{
		Status: true,
		Find:   model,
	})
}

func (ReportsC) OtherInventoryOutputsReport(f *fiber.Ctx) error {
	que := struct {
		StartDate string `param:"startDate"`
		EndDate   string `param:"endDate"`
		Filter    string `param:"filter"`
	}{}
	err := f.QueryParser(&que)
	if err != nil {
		return err
	}

	model := []BusinessC{}
	db := config.DB.Model(models.OtherInventoryOutput{})
	db.
		Preload("Article").
		Preload("Article.Category")
	if que.StartDate != "" && que.EndDate != "" {
		db.Where("DATE(created_at) BETWEEN ? AND ?", que.StartDate, que.EndDate)
	} else if que.Filter == "day" {
		db.Where("DATE(created_at) = ?", time.Now().Format("2006-01-02"))
	} else if que.Filter == "week" {
		dateNow := time.Now().Format("2006-01-02")
		dateMinusOneWeek := time.Now().AddDate(0, 0, -7).Format("2006-01-02")
		db.Where("DATE(created_at) BETWEEN ? AND ?", dateMinusOneWeek, dateNow)
	} else if que.Filter == "month" {
		dateNow := time.Now().Format("2006-01-02")
		dateMinusOneMonth := time.Now().AddDate(0, -1, 0).Format("2006-01-02")
		db.Where("DATE(created_at) BETWEEN ? AND ?", dateMinusOneMonth, dateNow)
	} else if que.Filter == "year" {
		dateNow := time.Now().Format("2006-01-02")
		dateMinusOneYear := time.Now().AddDate(-1, 0, 0).Format("2006-01-02")
		db.Where("DATE(created_at) BETWEEN ? AND ?", dateMinusOneYear, dateNow)
	}

	db.Order("created_at DESC").Find(&model)
	if db.RowsAffected == 0 {
		return f.JSON(types.Response{
			Status: false,
			Msj:    "No se encontraron registros",
		})
	}

	return f.JSON(types.Response{
		Status: true,
		Find:   model,
	})
}
